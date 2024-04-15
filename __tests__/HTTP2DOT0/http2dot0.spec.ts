import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C119138",
  "CIO58085",
  "CIO58085two",
  "C58006",
  "C66039",
  "CIO29647",
  "CT26354T26351T28950T19565"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
