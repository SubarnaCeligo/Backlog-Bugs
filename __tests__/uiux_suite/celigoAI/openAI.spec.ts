import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C110485",
"C110486",
"C110487",
"C110488",
"C110489",
"C110490",
"C112021",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"celigoAI");
})();