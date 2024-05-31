import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
// "C22282",
// "C2397",
// "C77923",
// "C22227",
// "T28487",
// "C102890",
"T31825",
"T31826",
"T31827",
"T31828_T31829_T31831",
"T31830",
"T31832"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"marketplace")
    })();