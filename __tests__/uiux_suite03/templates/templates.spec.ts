import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "T1686",
  "T26356",
  "IO-T31836",
  "IO-T32339",
  "C108853",
  "C19911",
  "T14276_T14277",
  "T14275",
  "T5994"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "templates")
})();