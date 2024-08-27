import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
"T37558",
"T29008",
"T29009",
"T37562",
"T37563",
"T37566",
"T37567",
"T37631",
"T37638",
"T37639",
"T37657"
];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "filter");
})();
