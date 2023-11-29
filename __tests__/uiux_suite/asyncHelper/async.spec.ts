import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C63512",
"C63513"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"asyncHelper");
})();