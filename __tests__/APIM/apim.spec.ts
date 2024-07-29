import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C59279",
  "C59255",
  // "C46760",
  // "C65053",
  // "C46760s",
  // "T28864"

];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
