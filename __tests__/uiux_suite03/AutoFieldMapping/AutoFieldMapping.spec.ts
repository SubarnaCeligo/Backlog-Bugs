import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "C26858",
  "C26860",
  "C25947",
  "C25946",
  "C27372",
  "T22564_T2641",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "AutoFieldMapping");
})();