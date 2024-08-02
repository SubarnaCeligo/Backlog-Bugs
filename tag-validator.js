const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// List of required tags (currently empty)
const requiredTags = [];
const mandatoryTags = ['@Zephyr', '@Env'];

// Get the list of files that have been modified or added
const getChangedFiles = () => {
    const output = execSync('git diff --name-only playwright-ts', { encoding: 'utf-8' });
    return output.split('\n').filter(filename => filename.startsWith('__tests__/') && !filename.includes('.spec') && !filename.endsWith('.json'));
};

// Function to check tags in test titles
const checkTagsInFiles = (filePaths) => {
    let allValid = true;
    filePaths.forEach(filePath => {
        try {
            const data = fs.readFileSync(filePath, 'utf8');
            const testTitleMatches = data.match(/(?:test|test\.skip)\((`[^`]+`|'[^']+'|"[^"]+")/g);
            if (testTitleMatches) {
                testTitleMatches.forEach(testTitleMatch => {
                    const testTitle = testTitleMatch.match(/(?:test|test\.skip)\((`([^`]+)`|'([^']+)'|"([^"]+)")/)[2] || testTitleMatch.match(/(?:test|test\.skip)\((`([^`]+)`|'([^']+)'|"([^"]+)")/)[3] || testTitleMatch.match(/(?:test|test\.skip)\((`([^`]+)`|'([^']+)'|"([^"]+)")/)[4];
                    console.log("testTitle",testTitle);
                    const hasMandatoryTags = mandatoryTags.every(tag => testTitle.includes(tag));

                    if (!hasMandatoryTags) {
                        allValid = false;
                        console.error(`Both mandatory tags '${mandatoryTags.join(', ')}' should be present in testcase >> ${filePath} \nTest title: ${testTitle}`);
                    }
                });
            } else {
                allValid = false;
                console.error(`No tests found in file >> ${filePath}`);
            }
        } catch (err) {
            console.error(err.message);
        }
    });
    if (allValid) {
        console.log('ALL MANDATORY TAGS ARE PRESENT IN THE TEST CASES');
        return true;
    }
    return false;
};

const tagValidator = () => {
    const changedFiles = getChangedFiles();
    if (changedFiles.length === 0) {
        console.log('NO TEST CASE FILES HAVE BEEN CHANGED');
        return true;
    } else {
        return checkTagsInFiles(changedFiles);
    }
};

console.log(tagValidator());