import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C55951",
  "C55952",
  "C55953",
  "C55954",
  "C55955",
  "C55971",
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
