import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C22282",
"C2397",
"C77923",
"C22227",
"T28487",
"C102890"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"marketplace")
    })();