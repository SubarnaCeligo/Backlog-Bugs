import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C98433",
"C119818"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"transformation")
    })();
