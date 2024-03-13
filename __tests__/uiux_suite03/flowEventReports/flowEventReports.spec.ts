import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C27103", 
  // "C27073",
  // "C27109",
  // "C27042",
  // "C24942",
  // "C27108",
  // "C27111",
  // "C24965",
  // "C24966",
  // "C24968",
  // "C27107",
  // "C27110",
  "C24967",
  "C27104",
  "C27101",
  "C27653",
  "C27514",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowEventReports");
})();
