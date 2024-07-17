import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C110781_C110787_C110788_C111507",
  "T833"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
