import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
   "C104751",
   "T19396_T19397_T19409",
    "T19402_T19403",
   "T19404",
   "T19411_T19405",
   "T19412",
   "T19398",
   "IOT8205",
   "IOT8208",

];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
