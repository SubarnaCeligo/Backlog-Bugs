import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "T1365",
  "C27460",
  "C53304",
  "C53096",
  "C53302",
  "T9428",
  "T14479 ",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();