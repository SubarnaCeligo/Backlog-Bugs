import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "C68554",
  "C68560", //this test will fail as we don't have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  "C68561",
  "C68561",
  "C68562",
  "C68563",
  "C68564",
  "C68565",
  "C68492",
  "C68493",
  "C65961",
  "C69064",
  "C68544",
  "C117329",
  "T27451",
  "C14612",
  "T23953",
  "T10044",
  "T17324",
  "T17467",
  "T17370_T17358_T17387",
  "T18958",
  "T17388",
  "IO-T25359",
  "T15759",
  "C68478",
  "T25360"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBranching")
})();