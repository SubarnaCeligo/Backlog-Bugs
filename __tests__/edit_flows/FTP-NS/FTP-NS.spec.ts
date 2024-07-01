import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C30397_FTP_NS_mapping_setting",
"T32668"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"FTP-NS");
})();
