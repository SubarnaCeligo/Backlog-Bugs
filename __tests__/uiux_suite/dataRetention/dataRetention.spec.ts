import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C53030",
"C53078",
"C56827",
"C58307",
"C58590",
"C58592"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"dataRetention");
    })();