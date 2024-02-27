import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C27103", 
  "C27073",
  "C27109"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowEventReports");
})();
