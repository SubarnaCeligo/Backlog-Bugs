import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C27103", 
  // "C27073",
  // "C27109",
  // "C27042",
  // "C24942",
  // "C27108",
  // "C27111",
  "C24965"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowEventReports");
})();
