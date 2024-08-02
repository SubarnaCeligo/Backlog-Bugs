import { filterTestCases } from "@celigo/aut-utilities";
let testCases = [
"IOT12568",
"IOT12567",
"T7029",
"T5034"
];


let flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "subscription");
})();
