import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C102620",
  "IO-T34774",
  "IO-T34771",
  "T17086_T17088",
  "T18947_T18949_T18948",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBuilder");
})();
