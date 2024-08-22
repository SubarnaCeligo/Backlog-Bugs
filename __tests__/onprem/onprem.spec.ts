import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
   "C104751",
   "T19396_T19397_T19409",
    "T19402_T19403",
   "T19404",
   "T19411_T19405",
   "T19412",
   "T19398",
   "IOT8208",
   "C104753",
   "new_ui_onprem_2_3_4",
  "old_ui_onprem_5_6_7",
  "new_ui_cloud_8",
  "new_cloud_clone_10",
  "old_cloud_clone_11",
  "new_onprem_clone_13",
  "old_onprem_clone_12"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
