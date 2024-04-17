import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
 "1"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "dashboard");
})();
