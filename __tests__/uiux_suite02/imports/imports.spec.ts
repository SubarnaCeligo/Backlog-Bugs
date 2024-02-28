import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C33162",
  "C33166",
  "C61343",
  "C33165",
  "C61022",
  "C22818",
  "C63406",
  "C63001",
  "C63111",
  "C52427",
  "C93561",
  "C30504",
  "C113932",
  "C120083",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "imports");
})();
