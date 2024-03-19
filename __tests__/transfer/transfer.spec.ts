import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
 "C2285",
 "C2255_C2288_C2290_C2284_C2291"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();


