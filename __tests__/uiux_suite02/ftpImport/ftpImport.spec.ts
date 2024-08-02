import {filterTestCases} from "@celigo/aut-utilities"
var testCases = [
"C77813",
"C77814",
"C77815",
"C77816",
"C77821",
"C77822",
"C77823",
"C77824",
"C77805",
"C77807",
"C77829",
"C77830",
"C77831",
"C77832",
"C77837",
"C77838",
"C77839",
"C77840",
"C112084",
"C113413",
"C32141",
"T11538",
"T11561",
"T11537"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"ftpImport")
    })();