import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C107885",
  "C107916",
  "C21262",
  "C42590",
  "C45345",
  //"C107857",
  "C107901",
  "C107906",
  "C107910",
  "C107851",
  "C107841"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "NS-FTP");
})();
