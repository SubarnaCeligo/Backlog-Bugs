
import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
    "C25997",
    "IO-T28943",
    "T4867_T4869"  

];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
    await filterTestCases(testCases, flakycases, "webhooks")
})();