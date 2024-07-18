import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C59668",
"C60604",
"C35067",
"C68897",
"C68993",
"C46938",
"C46932",
"C46931",
"T5295"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases,flakycases,"auditLogs");
})();
