import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "flowbranching_api",
  "flowbranching_UI"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();

