const { spawn } = require("child_process");

//const suites = ["Database_Imports", "Cloning"];
function runMultipleSuites(suites,env,singleWorkerSuites){
    const commands = suites.map(suiteName => {
        if (singleWorkerSuites.includes(suiteName)) {
            return `ENV=ci FEATURE=${suiteName} IGNORE_FLAKY=true workers=1 npm run test-docker`;
        } else {
            return `ENV=ci FEATURE=${suiteName} IGNORE_FLAKY=true npm run test-docker`;
        }
    });


try {
    const processes = commands.map(command => {
        console.log(`Running command: ${command}`);
        const child = spawn(command, { shell: true, stdio: "inherit" });
        child.on("exit", code => {
            console.log(`Command '${command}' exited with code ${code}`);
        });
        return child;
    });

    // Wait for all processes to finish
    Promise.all(processes.map(process => new Promise(resolve => process.on("exit", resolve))))
        .then(() => {
            console.log("All commands have finished executing.");
        })
        .catch(error => {
            console.error(error);
        });
} catch (error) {
    console.error(error);
}
}
module.exports = runMultipleSuites;