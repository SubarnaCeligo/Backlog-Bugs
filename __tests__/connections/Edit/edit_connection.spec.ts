import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
 "T27692_T27693_T27694",
 "T27705_T27706",
 "T27708_T27709",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "Edit");
})();