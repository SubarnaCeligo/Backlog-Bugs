import {filterTestCases} from "@celigo/aut-utilities"
var testCases = ["C61132",
"C61136",
"C61153",
"C61156",
"C61159",
"C61135",
"C61158",
"C61155"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"suiteApp")
    })();
