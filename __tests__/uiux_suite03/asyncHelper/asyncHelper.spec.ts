import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C63512",
"C63513",
"C33011",
"C42440",
"C42443"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"asyncHelper");
})();