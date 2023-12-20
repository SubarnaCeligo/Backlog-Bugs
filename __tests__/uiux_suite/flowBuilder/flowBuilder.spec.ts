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
"C110417",
"C110645",
"C110646",
"C110647",
"C110648",
"C110655",
"C110672",
"C110673",
"C110674",
"C110675",
"C110676",
"C110677",
"C110678",
"C110679",
"C110680",
"C110681",
"C110683",
"C98942",
"C98931",
"C50869",
"C45564",
"IO52927",
"IO51317",
"IO50942",
"IO50904",
"IO51323",
"C113933",
"C108696",
"C108670",
"C108698",
"C108697",
"C108700",
"C108695",
"C1518",
"C108514"
]
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
    (async () => {
      await filterTestCases(testCases,flakycases,"flowBuilder")
    })();
