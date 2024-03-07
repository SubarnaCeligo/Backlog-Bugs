import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C53304",
"C53096",
"C53302"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases);
})();

