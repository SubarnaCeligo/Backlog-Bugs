import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C55951_C56164",
  "C55953_C55952_C55971_C67102_C55954",
  "C56285_C55955",
  "C61360_C61361_C67006",
  "C67013",
  "C26256",
  "C27017"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();