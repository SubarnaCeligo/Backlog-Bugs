import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
 "T28965_T28967",
 "T28966",
 "T28968",
 "T28969",
"T28970_T28971"
];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "FAGeneration");
})();
