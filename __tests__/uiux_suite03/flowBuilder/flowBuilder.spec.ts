import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C106452",
  "C108514",
  "C108670",
  "C108695",
  "C108696",
  "C108697",
  "C108698",
  "C108700",
  "C110379",
  "C110409",
  "C110411",
  "C110416",
  "C110417",
  "C110538",
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
  "C110682",
  "C110683",
  "C110686",
  "C110690",
  "C110695",
  "C110713",
  "C110715",
  "C111309",
  "C111312",
  "C111328",
  "C111331",
  "C111332",
  "C111333",
  "C111335",
  "C111341",
  "C111343",
  "C111344",
  "C111345",
  "C111346",
  "C111348",
  "C111350",
  "C111395",
  "C111401",
  "C111781",
  "C112004",
  "C113002",
  "C113437",
  "C113933",
  "C115649",
  "C14351",
  "C1518",
  "C24850",
  "C2660",
  "C32975",
  "C33018",
  "C45564",
  "C50869",
  "C65649",
  "C65755",
  "C67221",
  "C93548",
  "C98931",
  "C98942",
  "IO50904",
  "IO50942",
  "IO51317",
  "IO51323",
  "IO52927",
  "IO60215",
  "IO60432",
  "C117742",
  "C117948",
  "IO63636",
  // "C102875",
  // "C119139",
  // "C119397",
  "C117949",
  "C68894",
  "C119625",
  "C113459",
  "IO60215",
  "IO60432",
  "C117742",
  "C117948",
  "IO63636",
  "C117739",
  "C117738",
  "C117737_C117736",
  "C117734_C117735",
  "IO60215",
  "IO60432",
  "C117742",
  "C117948",
  "IO63636",
  "IO60432",
  "C117742",
  "C117948",
  "IO63636",
  "C102875",
  "C117949",
  "C119139",
  "C68894",
  "C117947_C117945",
  "C117946",
  "C117741",
  "C117740",
  "C117743",
  "C33011",
  "C106846",
  "C115891",
  "C117753",
  "C113519",
  "C113934",
  "C1968",
  "C26246",
  "C19882",
  "C106829",
  "C104208",
  "C106830",
  "C106451",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBuilder");
})();
