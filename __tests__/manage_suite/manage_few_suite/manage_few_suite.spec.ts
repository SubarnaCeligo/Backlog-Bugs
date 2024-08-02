import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C24894",
  "C24938",
  "C24945",
  "C24954",
  "C2757",
  "C41558",
  "C41126",
  "C41548",
  "C41546_C41556_C41549",
  "C41557",
  "IO-T31975"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "manage_few_suite");
})();
