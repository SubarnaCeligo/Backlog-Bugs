import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C61932",
  "C2714",
  "C1516",
  "C39973",
  "C65744",
  "C66306",
  "C66316",
  "C67008",
  "C67037",
  "C67038",
  "C100968"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
