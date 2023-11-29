import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C61349",
"C62413"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"cloning")
})();

