import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
    "T39223_T39224",
    "T39225",
    "T39226",
    "T39244"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
    await filterTestCases(testCases, flakycases);
})();
