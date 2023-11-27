import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C752",
"C1547",
"C1568",
"C733",
"C25555",
"C108513",
"C101084",
"C33306",
"C33307"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"accounts");
})();
