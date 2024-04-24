import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C59642",
  "C59659",
  "C56424",
  "C56283",
  "C60447",
  "C56284",
  "C56287",
  "C56423",
  "C56428",
  "C57330",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
