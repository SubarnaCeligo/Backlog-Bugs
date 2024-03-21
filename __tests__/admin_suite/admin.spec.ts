import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C24899",
  "C24935",
  "C41543"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
