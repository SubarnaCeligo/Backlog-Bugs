import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "IOT457",
  // "IOT480",
  // "IOT17167",
  "IOT31938",
  "IOT32593",
  "IOT32594"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "ILM");
})();
