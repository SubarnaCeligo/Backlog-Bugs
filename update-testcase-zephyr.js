const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { ZephyrTestCase } = require('./node_modules/@celigo/aut-utilities/dist/src/zephyr/ZephyrClient/ZephyrTestCase.js');

// Function to get the list of changed files in the __tests__ folder
const getChangedFiles = () => {
    const output = execSync('git diff --name-only playwright-ts', { encoding: 'utf-8' });
    return output.split('\n').filter(filename => filename.startsWith('__tests__/') && !filename.includes('.spec') && !filename.endsWith('.json'));
};

// Function to extract test case identifiers from the test titles
const extractTestIdentifiers = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const testTitleMatches = data.match(/test(?:\.skip)?\s*\(\s*['"`]([^'"`]+)['"`]/g);

        if (testTitleMatches) {
            const identifiers = [];
            testTitleMatches.forEach(testTitleMatch => {
                const testTitle = testTitleMatch.match(/test(?:\.skip)?\s*\(\s*['"`]([^'"`]+)['"`]/)[1];
                const foundIdentifiers = testTitle.match(/IO-T\d+/g);
                if (foundIdentifiers) {
                    identifiers.push(...foundIdentifiers);
                }
            });
            return identifiers;
        } else {
            console.error(`No test titles found in file >> ${filePath}`);
            return [];
        }
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
        return [];
    }
};
const getZephyrTestCaseIds = () => {
    const changedFiles = getChangedFiles();
    if (changedFiles.length === 0) {
        console.log('NO TEST CASE FILES HAVE BEEN CHANGED');
        return [];
    } else {
        const allIdentifiers = [];
        changedFiles.forEach(filePath => {
            const identifiers = extractTestIdentifiers(filePath);
            if (identifiers.length > 0) {
                console.log(`Found identifiers in ${filePath}: ${identifiers.join(', ')}`);
                allIdentifiers.push(...identifiers);
            }
        });

        if (allIdentifiers.length > 0) {
            console.log('All extracted test case identifiers:', allIdentifiers.join(', '));
            return allIdentifiers;
        } else {
            console.error('ZEPHYR IDS ARE INCORRECT. PLEASE CHECK');
            return false;
        }
    }
};

const updateZephyrTestCases = async () => {
    const testCaseIds = getZephyrTestCaseIds();
    if (testCaseIds.length === 0) {
        console.log('No test case IDs to update.');
        return true;
    }

    const zephyrTestCase = new ZephyrTestCase();
    let allUpdated = true;
    for (const testCaseId of testCaseIds) {
        try {
            const updated = await zephyrTestCase.updateTestCase(testCaseId, 'UI');
           if (!updated) {
            allUpdated = false;
        }
        } catch (error) {
            console.error(`Failed to update test case ID: ${testCaseId}`, error);
            allUpdated = false;
        }
    }
    return allUpdated;
};

// Execute the update process
// updateZephyrTestCases().then(() => {
//     console.log('Finished updating test cases.');
// }).catch(err => {
//     console.error('Error updating test cases:', err);
//     process.exit(1);
// });
const updatingtestcases = async () => {
    const changedFiles = getChangedFiles();
    if (changedFiles.length === 0) {
        console.log('NO TEST CASE FILES HAVE BEEN CHANGED');
        return true;
    } else {
        return await updateZephyrTestCases();
    }
}
// Execute the update process
(async () => {
    console.log(await updatingtestcases());
})();
