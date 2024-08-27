import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "T1365",
  "C27460",
  "C53304",
  "C53096",
  "C53302",
  "T9428",
  "T14437",
  "T17049",
  "T14438",
  "T5462",
  "T5455",
  "T14479",
  // "IO-T37325", IO-87614 Reverted epic changes
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
