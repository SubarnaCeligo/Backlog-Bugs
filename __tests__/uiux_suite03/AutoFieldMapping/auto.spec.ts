import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "C26858",
  "C26860",
  "C25947",
  "C25946",
  "C27372",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "AutoFieldMapping");
})();