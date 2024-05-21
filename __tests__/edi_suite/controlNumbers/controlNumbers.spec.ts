import { filterTestCases } from "@celigo/aut-utilities";
//skiping cases as these are not yet merged in master
var testCases = [
  "C27162",
  "C22913",
  "C271623_T27164_T27165_T27165"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "controlNumbers");
})();
