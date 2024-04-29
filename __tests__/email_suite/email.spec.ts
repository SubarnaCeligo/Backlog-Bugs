import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C55951",
  "C55952_C55953_C55954_C55955_C55971",
  "C56285",
  "C67012",
  "C56164",
  "C61361",
  "C61360"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
