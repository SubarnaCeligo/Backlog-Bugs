import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C24899",
  // "C24935",
  // "C41543",
  // "C41540",
  // "C41545",
  // "C41554",
  // "C41569",
  // "C41573",
  // "C45825",
  "C27910"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
