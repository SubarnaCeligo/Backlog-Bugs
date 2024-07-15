import { filterTestCases } from "@celigo/aut-utilities";
let testCases = [
  "IOT12568"
];

let flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "subscription");
})();
