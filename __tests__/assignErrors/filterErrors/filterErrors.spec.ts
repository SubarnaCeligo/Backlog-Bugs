import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C117998_C118283",
  "C117999_C118000",
  "C118039",
  "C118037_C118038",
  "C118118_C118284",
  "C118277",
  "C118278",
  "C118279",
  "C118280",
  "C118281_C118282",
  "C118039",
  "C1968",
  "C26246",
  "C19882"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "filterErrors");
})();
