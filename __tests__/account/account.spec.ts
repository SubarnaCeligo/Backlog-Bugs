import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C65455",
  "C102862",
  // "C53063",
  // "IO-T28437",
 // "C110068" // C110068 should be at the end.,
 "T32664"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
