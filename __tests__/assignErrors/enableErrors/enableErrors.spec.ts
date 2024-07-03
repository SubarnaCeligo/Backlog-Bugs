import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C118286_C118287_C28390_C118292",
  // "C119823",
  // "C119821",
  // "C119819"
  //This suite is dedicated to assign error epic which is using a dediacted account, please do not add new cases here
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "enableErrors");

})();
