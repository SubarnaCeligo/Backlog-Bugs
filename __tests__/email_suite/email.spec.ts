import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C55951",
  // "C55952",
  // "C55953",
  // "C55954",
  // "C55955",
  // "C55971",
  // "C56285",
  // "C67012",
  // "C56164",
  // "C61361",
  // "C61360",
  "C26256",
  // "C55951_C56164",
  // "C55953_C55952_C55971_C67102_C55954",
  // "C56285_C55955",
  // "C61360_C61361",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
