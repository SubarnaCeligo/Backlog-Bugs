import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C60447",
  "C62760",
  "C59642",
  "C59659",
  "C56424",
  "C56428",
  "C56424",
  "C66316",
  "C56283",
  "C56284",
  "C56287",
  "C56423",
  "C58439",
  "C66318",
  "C59778",
  "C66306",
  "C66307",
  "C67008",
  "C59777",
  "C65744",
  "C67037",
  "C67038",
  "C61932",
  "C100968",
  "C59779",
  "C62667",
  "C2714",
  "C1516",
  "C39973",
  "C62659"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
