import {filterTestCases} from "@celigo/aut-utilities"
var testCases = ["C32975",
"C67221",
"C2660",
"C24850",
"C93548",
"C65649",
"C65755",
"C110379",
"C110695",
"C110538",
"C110682",
"C110686",
"C110690",
"C110715",
"C110713",
"C111309",
"C111312",
"C111395",
"C111401",
"C111781",
"C112004",
"C110409",
"C110411",
"C110416",
"C110417"
]
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"flowBuilder")
    })();
