import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C61349",
  "C32362",
  "C62413",
  "C112086",
  "C113414",
  "C51579",
  "IOT481",
  "IOT5360"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "cloning");
})();
