import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C24898",
"C24936",
"C24943",
"C2014",
"C1560",
"C23055",
"T30796",
"IOT452"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"manage_all_suite");
})();
