import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C34437",
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
  "C106830",
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
  "C119397",

  "C119625",
  "C113459",


  "C117739",
  "C117738",
  "C117737_C117736",
  "C117734_C117735",

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
  "C106451",
  "T27372",
  "T27371",
  "T27370",
  "T27368",
  "C34887",
  "T26932",
  "T26933",
  "T26934",
  "T26935",
  "T26936",
  "T26937",
  "T26938",
  "T26939",
  "T26940",
  "T26941",
  "T26942_T26943",
  "T26946",
  "T26944",
  "T26947",
  "T26945",
  "C104953",
  "IOT26978",
  "IOT26979",
  "IOT26980",
  "IOT26981",
  "IOT26982",
  "IOT26983",
  "IOT26984",
  "IOT26985",
  "IOT26987",
  "IOT26988",
  "IOT26989",
  "IOT26990",
  "IOT26991",
  "IOT26992",
  "IOT26993",
  "IOT26994",
  "IOT24286",
  "IOT24287",
  "IOT24288",
  "IOT24290",
  "IOT24291",
  "IOT24292",
  "IOT24293",
  "IOT24294",
  "IOT24295",
  "IOT26357",
  "IO70947",
  "C107021",
  "T3097",
  "T24275",
  "T24276_T27516",
  "T24277_T24278_T24283",
  "T24279",
  "T24280",
  "T24284",
  "T24285",
  "T2722",
  "T10043",
  "T26974",
  "T26975",
  "T26976",
  "T26977",
  "T26986",
  "T26995",
  "C20812",
  "C24619",
  "C42440",
  "C107001",
  "T28451",
  "T28606",
  "T24261",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flowBuilder");
})();
