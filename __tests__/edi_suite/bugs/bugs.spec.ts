import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
    "T29350",
    "T30612",
    "T32334",
    "T32428",
    "T37293",
    "T37752",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "bugs");
})();
