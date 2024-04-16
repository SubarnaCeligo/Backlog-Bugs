import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C46760",
  "C59279",
  "C65053",
  "C59255"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
