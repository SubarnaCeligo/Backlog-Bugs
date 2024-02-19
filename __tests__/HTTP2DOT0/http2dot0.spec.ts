import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  //"C58006",
  "C119138",
  "CIO58085",
  "CIO58085two",
  "C58006",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();