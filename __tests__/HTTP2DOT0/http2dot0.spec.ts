import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C58006",
  // "C119138",
  // "CIO58085",
  // "CIO58085two",
  // "C58006",
  // "C66039",
  // "T27692_T27693_T27694",
  // "T27696_T27705_T27706",
  // "T27702_T27703",
  // "T27704",
  // "T27708_T27709_T27695",
  //  "CIO29647",
  // "CT26354T26351T28950T19565",
  // "CIO54642",
  //  "CT30323",
  //  "CT30379",
   "T31944",
   "T31950",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
