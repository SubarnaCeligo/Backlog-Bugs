import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C58307",
"C53030",
"C58590",
"C58592",
"C53078",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"dataRetention");
    })();