const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const runMultipleSuites = require('./dockerRunner');
let ENV = "ci";
let workers = 3;
let suitesexcluded = ["uiux_suite01", "uiux_suite02", "uiux_suite03"];
// Get the list of files that have been modified or added
const getChangedFiles = () => {
    const output = execSync('git diff --name-only playwright-ts', { encoding: 'utf-8' });
    return output.split('\n').filter(filename => filename.startsWith('__tests__/') || filename === 'Makefile');
};

// /**
//  * Retrieves the environment from the Makefile and sets the ENV variable accordingly.
//  * @param {string[]} changedFiles - An array of file paths that have been changed.
//  */
// const getEnvFromMakefile = (changedFiles) => {
//     // Check if 'Makefile' is included in the changed files
//     if (changedFiles.includes('Makefile')) {
//         const makefilePath = path.join(process.env.PWD, 'Makefile');
//         const makefileContent = fs.readFileSync(makefilePath, 'utf8');

//         // Extract the value of ENV from the Makefile content
//         const match = makefileContent.match(/^ENV=(.*)$/m);
//         if (match) {
//             ENV = match[1];
//             console.log("Running API tests in " + ENV + " environment");
//         }
//     }
// };


const runTests = () => {
    const changedFiles = getChangedFiles();
    const changedFolders = [];
    // getEnvFromMakefile(changedFiles);

    // Determine which folders under 'testcases/' have changes
    for (const file of changedFiles) {
        const parts = file.split('/');
        if (parts.length > 1) {
            const folderName = parts[1]; // 'parts[1]' should be the folder name under 'testcases/'
            if (suitesexcluded.includes(folderName)) {
                continue;
            }
            if (!changedFolders.includes(folderName)) {
                changedFolders.push(folderName);
                break;
            }
        }
    }
    // const ChangesExcluded = changedFolders.filter(folder => suitesexcluded.includes(folder));
    // const otherChanges = changedFolders.filter(folder => !suitesexcluded.includes(folder));
    // console.log("changes in other folders",otherChanges)
    if (changedFolders.length === 0) {
        // If no folders have changed, execute 'npm ci'
        console.log("No changes in '__tests__/' folders. Running Unit tests.");
        const unittests = `ENV=ci FEATURE=CI npm run test-docker`;
        console.log("Running Command:",unittests)
        execSync(unittests, { stdio: 'inherit' });
    } else {
        console.log("Files Changed In Folders:", changedFolders);
        if (changedFolders.length > workers) {
            // Log the error message
            console.error("\x1b[31m\x1b[1mChanges involving more than 3 suites cannot be included in a single PR. Please create separate PRs.\x1b[0m");
            process.exit(1);
        }
        // } else if (ChangesExcluded.length > 0 && otherChanges.length > 0) {
        //     // If there are changes in UI/UX suites and other folders, run the first folder in the other category
        //     const folderToTest = otherChanges[0];
        //     console.log(`Running tests for the folder: ${folderToTest}`);
        //     const testCommand = `ENV=ci FEATURE=${folderToTest} npm run test-docker`;
        //     console.log("Running Command:", testCommand);
        //     execSync(testCommand, { stdio: 'inherit' });
        // } else if (ChangesExcluded.length > 0) {
        //     // If there are changes in any of the UI/UX suites, run the unit tests command
        //     const unittests = `ENV=ci FEATURE=CI npm run test-docker`;
        //     console.log("Running Command:", unittests);
        //     execSync(unittests, { stdio: 'inherit' });
        // } 
        else {
            const folderToTest = changedFolders[0];
            console.log(`Running tests for the folder: ${folderToTest}`);
            const testCommand = `ENV=ci FEATURE=${folderToTest} npm run test-docker`;
            console.log("Running Command:", testCommand);
            // execSync(testCommand, { stdio: 'inherit' });
            runMultipleSuites(changedFolders, ENV);
        }
       
    }
};

runTests();
