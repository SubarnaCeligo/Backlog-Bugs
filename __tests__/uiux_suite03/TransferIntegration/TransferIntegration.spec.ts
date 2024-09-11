import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C22464",
 "C26374",
 "C2127", 
"C22465", 
"C2039"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "TransferIntegration");
})();
