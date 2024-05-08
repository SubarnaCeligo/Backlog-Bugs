import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C27422",
  "C27423",
  "T28944_T28945_T28946_T28947",
  "T28948",
  "T28959",
  "T29065"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
