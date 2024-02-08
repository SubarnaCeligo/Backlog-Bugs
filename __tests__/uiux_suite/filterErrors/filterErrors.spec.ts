import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C118036",
  "TC_C117998_C118283",
  "TC_C118280",
  "TC_C118281_C118282",
  "TC_C118284",
  "TC_C118039",
  "TC_C118037_C118038",
  "TC_C118118",
  "TC_C118277",
  "TC_C118278",
  "TC_C118279",
  "C118039",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
