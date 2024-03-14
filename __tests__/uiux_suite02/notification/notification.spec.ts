import { filterTestCases } from "@celigo/aut-utilities";
var testCases = ["C20898", "C21062", "C63190"];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "notification");
})();
