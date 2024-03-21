import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
// "C752",
// "C1547",
// "C1568",
// "C733",
// "C25555",
// "C51065",
// "C108513",
// "C101084",
// "C33306",
// "C33307",
// "C111495_C111496_C111497_C111498_C111499_C111500_C111501_C111502",
// "C53073",
// "C33282",
// "C33283",
// "C28400",
"IO-T28437"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"accounts");
})();
