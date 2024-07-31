import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C108402",
  "C103569",
  "C108586",
  "T25318",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "errors");
})();
