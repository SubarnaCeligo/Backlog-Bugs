const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const runMultipleSuites = require('./dockerRunner');
let ENV = "ci";
let workers = 3;
let suitesexcluded = ["uiux_suite01", "uiux_suite02", "uiux_suite03", "edi_suite"];
let singleWorkerSuites = ["APIM", "account", "admin_suite", "assignErrors", "CeligoAI", "connections", "custom_suite", "e2e_flows", "edit_flows", "email_suite", "email_validation", "flowbranching", "HTTP2DOT0", "integration_apps", "manage_suite", "monitor_suite", "onprem", "pricing_model_suite", "signinPage", "signoutPage", "SS2.0", "transfer", "transferSBflow", "user_notify"]; // Define the list of single worker suites
// Get the list of files that have been modified or added
const getChangedFiles = () => {
    const output = execSync('git diff --name-only playwright-ts', { encoding: 'utf-8' });
    return output.split('\n').filter(filename => filename.startsWith('__tests__/') || filename === 'Makefile');
};

const runTests = () => {
    const changedFiles = getChangedFiles();
    const changedFolders = [];
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

    if (changedFolders.length === 0) {
        // If no folders have changed, execute 'npm ci'
        console.log("No changes in  '__tests__/' folders. Running Unit tests.");
        const unittests = `ENV=ci FEATURE=unit_test npm run test:ci`;
        console.log("Running Command:",unittests)
        execSync(unittests, { stdio: 'inherit' });
    } else {
        console.log("Files Changed In Folders:", changedFolders);
        if (changedFolders.length > workers) {
            // Log the error message
            console.error("\x1b[31m\x1b[1mChanges involving more than 3 suites cannot be included in a single PR. Please create separate PRs.\x1b[0m");
            process.exit(1);
        }
        else {
            const folderToTest = changedFolders[0];
            console.log(`Running tests for the folder: ${folderToTest}`);
            const testCommand = `ENV=ci FEATURE=${folderToTest} npm run test-docker`;
            runMultipleSuites(changedFolders, ENV, singleWorkerSuites);
        }

    }
};

runTests();
