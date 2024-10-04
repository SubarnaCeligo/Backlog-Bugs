import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
"T38082",
"T38083",
"T38138",
"T38140_T38489",
"T38141",
"T38142",
"T38143",
"T38144",
"T38145",
"T38146",
"T38147",
"T38148",
"T38149",
"T38150",
"T38151",
"T38152",
"T38153",
"T38154",
"T38139",
"T38490",
"T38495",
"T38494"
];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "search");
})();
