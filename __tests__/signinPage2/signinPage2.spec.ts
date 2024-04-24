import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C57331",
  "C58439",
  "C66307",
  "C57431",
  "C66318",
  "C59777",
  "C59778",
  "C59779",
  "C62659",
  "C62667",
  "C62760"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
