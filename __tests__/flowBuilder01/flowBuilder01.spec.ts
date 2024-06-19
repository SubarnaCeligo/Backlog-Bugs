import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C108673",
  // "C1518",
  // "C1968",
  // "C2660",
  // "C14351",
  // "C19882",
  // "C20812",
  // "C24268IO_C24269",
  // "C24270",
  // "C24271",
  // "C24272",
  // "C24273_C24274",
  // "C24282",
  // "C24297",
  // "C24619",
  // "C24850",
  // "C26246",
  // "C32975",
  // "C33011",
  // "C33018",
  // "C34437",
  // "C34887",
  // "C42440",
  // "C45564",
  // "C50869",
  // "C65649",
  // "C65755",
  // "C67221",
  // "C68894",
  // "C93548",
  // "C98931",
  // "C98942",
  // "C102875",
  // "C104208",
  // "C104953",
  // "C106451",
  // "C106452",
  // "C106829",
  // "C106830",
  // "C106846",
  // "C107001",
  // "C107021",
  // "C108514",
  // "C108670",
  // "C108695",
  // "C108696",
  // "C108697",
  // "C108698",
  // "C108700",
  // "C110379",
  // "C110409",
  // "C110411",
  // "C110416",
  // "C110417",
  // "C110538",
  // "C110645",
  // "C110646",
  // "C110647",
  // "C110648",
  // "C110655",
  // "C110672",
  // "C110673",
  // "C110674",
  // "C110675",
  // "C110676",
  // "C110677",
  // "C110678",
  // "C110679",
  // "C110680",
  // "C110681",
  // "C110682",
  // "C110683",
  // "C110686",
  // "C110690",
  // "C110695",
  // "C110713",
  // "C110715",
  // "C111309",
  // "C111312",
  // "C111328",
  // "C111331",
  // "C111332",
  // "C111333",
  // "C111335",
  // "C111341",
  // "C111343",
  // "C111344",
  // "C111345",
  // "C111346",
  // "C111348",
  // "C111350",
  // "C111395",
  // "C111401",
  // "C111781",
  // "C112004",
  // "C113002",
  // "C113437",
  // "C113459",
  // "C113519",
  // "C113933",
  // "C113934",
  // "C115649",
  // "C115891",
  // "C117734_C117735",
  // "C117737_C117736",
  // "C117738",
  // "C117739",
  // "C29786",
  // "C77690",
  // "C106421",
  // "C24492",
  // "C24622",
  // "C24625",
  // "IO-T32630",
  // "IO-T32631",
  // "IO-T31358",
  // "IO-T31357"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
