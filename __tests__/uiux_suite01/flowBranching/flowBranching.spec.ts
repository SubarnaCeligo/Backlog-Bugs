import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  // "C93992",
  // "C49539",
  // "C47992",
  // "C47425",
  // "C59975",
  // "C68107",
  // "C93997",
  // "C59977",
  // "C69565",
  // "C102708",
  // "C68531",
  // "C68554",
  // "C93996",
  // "C68560",
  // "C68561",
  // "C68562",
  // "C68563",
  // "C93995",
  // "C68564",
  // "C68565",
  // "C107972",
  // "C68488",
  // "C93994",
  // "C68492",
  // "C68493",
  // "C65961",
  // "C69064",
  // "C93993",
  // "C68544",
  // "C117329",
  // "T27451",
  "C14612",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBranching")
})();