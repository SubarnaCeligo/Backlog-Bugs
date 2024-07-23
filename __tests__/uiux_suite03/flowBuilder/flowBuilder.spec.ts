import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C102620",
  "IO-T34774",
  "IO-T34771",
  "IO-T34772",
  "IO-T33536",
  "C102620",
  "IO-T34774",
  "IO-T34771",
  "T17086_T17088",
  "T18947_T18949_T18948",
  "IO-T35026",
  "IO-T34557",
  "IO-T35133",
  "T24316",
  "T28953_T15739",
  "T9950",
  "C93991",
  "IO-T35642",
  "T5410",
  "IO-T35692",
  "IO-T5604"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBuilder");
})();
