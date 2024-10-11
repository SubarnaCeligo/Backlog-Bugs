import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C24956",
  "T30796",
  "IO-T37306",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
