#!/usr/bin/env node
const { getSubFolders } = require("@celigo/aut-utilities")
const inquirer = require("inquirer");
const chalk = require("chalk");
const figlet = require("figlet");
// Register plugin
inquirer.registerPrompt("search-list", require("inquirer-search-list"));
const execSync = require("child_process").execSync;

const init = () => {
    console.log(
        chalk.blue(
            figlet.textSync("Celigo-Automation", {
                font: "Standard",
                horizontalLayout: "default",
                verticalLayout: "default"
            })
        ) +
        "\n" +
        chalk.blue(
            figlet.textSync("*****(Press ctrl+c to abort)*****", {
                font: "term",
                horizontalLayout: "default",
                verticalLayout: "default",
            })
        )
    );
};

const help = () => {
    const helpQuestions = [
        {
            type: "list",
            name: "ACTION",
            message: "How can i help you ??",
            choices: [
                "RUNSUITE",
                "UPLOADREPORT",
            ],
            filter: type => type.toLowerCase(),
        },
    ];
    return inquirer.prompt(helpQuestions);
};

const askFeatureQuestion = () => {
    const questions = [
        {
            type: "search-list",
            name: "FEATURE",
            choices: [
                "connections",
                "e2e_flows",
                "integrationApps",
                "licenseExpired",
                "uiux_suite01",
                "uiux_suite02",
                "uiux_suite03",
                "transferSBflow",
                "transfer",
                "flowbranching",
                "MFA",
                "APIM",
                "HTTP2DOT0",
                "manage_suite",
                "monitor_suite",
                "CeligoAI",
                "pricing_model_suite",
                "onprem",
                "flowBuilder01",
                "admin_suite",
                "flowBuilder01"
            ],
            message: "Please Select A Feature:",
        }
    ];
    return inquirer.prompt(questions);
};
const askSuiteQuestion = (suites) => {
    const questions = [
        {
            type: "search-list",
            name: "SUITENAME",
            choices: suites,
            message: "Please Select A Suite:",
        },
    ];
    return inquirer.prompt(questions);
};

const success = message => {
    console.log(chalk.white.bgGreen.bold(`Done!`));
};

const run = async () => {
    // show script introduction
    init();
    // how can i help you?
    const helpAnswer = await help();
    const { ACTION } = helpAnswer;
    //upload the file
    if (ACTION === "uploadreport") {
        execSync(
            "ENV=dev npm run uploadReport",
            {
                stdio: "inherit",
            }
        );
    }
    //Run the suite in mac
    if (ACTION === "runsuite") {
        //ask questions
        const answer = await askFeatureQuestion();
        const { FEATURE } = answer;
        var feature = FEATURE;
        var suites = getSubFolders(FEATURE);
        var suite = "";
        if (suites.length > 0) {
            suites.push("RUN ALL SUITES");
            const answers = await askSuiteQuestion(suites);
            const { SUITENAME } = answers;
            suite = SUITENAME;
            if (suite == "RUN ALL SUITES") {
                suite = "";
            }
        }
        try {
            execSync("ENV=dev" + " FEATURE=" + feature + " SUITE=" + suite + " npm run test", {
                stdio: "inherit",
            });
        } catch (error) {
            //console.log(error);
        }
    }

    // show success message
    success();
};

run();
