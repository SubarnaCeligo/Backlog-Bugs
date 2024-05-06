import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C65744",
  "C66306",
  "C66316",
  "C67008",
  "C67037",
  "C67038",
  "C100968",
  "C57431",
  "C66318",
  "C59777",
  "C59778",
  "C59779",
  "C62659",
  "C62667",
  "C62760",
  "C56283",
  "C60447",
  "C56284",
  "C56287",
  "C56423",
  "C56428",
  "C57330"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
