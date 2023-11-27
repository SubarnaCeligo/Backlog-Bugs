import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C24899",
"C24935"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"admin_suite");
})();
