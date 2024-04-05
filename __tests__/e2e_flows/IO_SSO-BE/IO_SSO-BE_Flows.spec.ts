import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C27003"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "IO_SSO-BE");
})();
