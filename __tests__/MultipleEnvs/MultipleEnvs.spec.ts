import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
    "T39199_T39202",
    "T39200",
    "T39215"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
    await filterTestCases(testCases, flakycases);
})();
