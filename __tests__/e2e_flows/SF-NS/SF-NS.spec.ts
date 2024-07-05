import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"059_SF_ACC_TO_NS_CUST_ADD",
"076_NS-CUST-SF-ACC-UPSERT"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"SF-NS");
})();