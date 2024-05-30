import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
 "C2758",
 "C36721",
 "C1582"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();


