import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C24894",
"C24938",
"C24945",
"C24954",
"C2757",
"C51572",
"C106831",
"C106807",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"manage_few_suite");
})();

