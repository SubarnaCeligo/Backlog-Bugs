import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "C14284",
  "C9466",
  "IO-T22924",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "NSbundle")
})();