import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "T34066_T34067_T34071",
  "T34068",
  "T34069",
  "T34070_T34072"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "cloningAndILM");
})();
