import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C68814",
  "C68815",
  "C68816",
  "C68820",
  "C68821",
  "C68822",
  "C68824",
  "C68826",
  "C68830",
  "C48555",
  "C29580",
  "C23859",
  "T11646",
  "T2383",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "FTP");
})();
