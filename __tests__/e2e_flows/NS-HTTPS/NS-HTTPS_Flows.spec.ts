import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
  "IO-T4960",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"NS-HTTPS");
})();