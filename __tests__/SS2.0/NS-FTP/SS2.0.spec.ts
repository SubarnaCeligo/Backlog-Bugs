import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C107885",
  "C107916",
  "C21262",
  "C42590",
  "C45345"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "NS-FTP");
})();
