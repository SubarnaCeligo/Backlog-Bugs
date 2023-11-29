import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C51612",
"C51613",
"C51614",
"C56565",
"C56566",
"C51611",
"C51577",
"C51790"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"assistant");
})();
