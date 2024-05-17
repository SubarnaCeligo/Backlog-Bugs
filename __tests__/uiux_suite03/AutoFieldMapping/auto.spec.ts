import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
"C25947",
"C25946",
"C27372",
"C26858",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "AutoFieldMapping");
})();