import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
    "C102620",
    "IO-T34774",
    "IO-T34771",
    "IO-T34772",
    "IO-T33536",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBuilder");
})();
