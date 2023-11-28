import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C60447",
  "C62760",
  "C59642",
  "C59659",
  "C56424",
  "C56428",
  "C56424",
  "C1053",
  "C66316",
  "C56283",
  "C56284",
  "C56287",
  "C56423",
  "C58439",
  "C66318",
  "C1053",
  "C59778",
  "C66306",
  "C66307",
  "C67008",
  "C59777"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "signinPage");
})();
