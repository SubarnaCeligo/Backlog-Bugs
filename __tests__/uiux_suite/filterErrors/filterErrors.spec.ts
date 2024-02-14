import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C118036",
  "C117998_C118283",
  "C118280",
  "C118281_C118282",
  "C118284",
  "C118039",
  "C118037_C118038",
  "C118118",
  "C118277",
  "C118278",
  "C118279",
  "C118039",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "filterErrors");
})();
