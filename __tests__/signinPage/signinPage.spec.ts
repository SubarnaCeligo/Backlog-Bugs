import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C61932",
  "C2714",
  "C1516",
  "C39973",
  "C57331",
  "C58439",
  "C66307",
  "C59642",
  "C59659",
  "C56424"
 
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
