import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C45825"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "mfa_admin_suite");
})();
