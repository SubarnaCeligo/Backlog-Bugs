import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C58006",
  "C119138",
  "CIO58085",
  "CIO58085two",
  "C58006",
  "C66039",
  //"T27692_T27693_T27694", //commenting these cases as there are some issues in the functionality and these will be handled as part of an upcoming epic https://celigo.atlassian.net/browse/IO-77231
 // "T27696_T27705_T27706", //commenting these cases as there are some issues in the functionality and these will be handled as part of an upcoming epic https://celigo.atlassian.net/browse/IO-77231
 // "T27702_T27703", //commenting these cases as there are some issues in the functionality and these will be handled as part of an upcoming epic https://celigo.atlassian.net/browse/IO-77231
 // "T27704", //commenting these cases as there are some issues in the functionality and these will be handled as part of an upcoming epic https://celigo.atlassian.net/browse/IO-77231
 // "T27708_T27709_T27695", //commenting these cases as there are some issues in the functionality and these will be handled as part of an upcoming epic https://celigo.atlassian.net/browse/IO-77231
   "CIO29647",
  "CIO46374",
  "CIO54642",
  "CT30323",
   // "CT30379", //jira connector got unpublished in all the environments by connector team
  "T31944",
  "T31950",
  "T18927_T18928_T18929",
  "T18925",
  "T17062",
  "T24753",
 "CIO80906",
 "IOT18902"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
