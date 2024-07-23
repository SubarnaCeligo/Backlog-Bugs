import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "IO52927", // We are making this test case obsolete as we have removed "existing export" checkbox from UI (functionality is changed for this)
  // "C117949",//https://celigo.atlassian.net/browse/IO-35839
  // "C119397",//https://celigo.atlassian.net/browse/IO-35839
  // "T2722",//https://celigo.atlassian.net/browse/IO-35839
  // "T24275",//https://celigo.atlassian.net/browse/IO-35839
  // "T26974",//https://celigo.atlassian.net/browse/IO-86853
  // "T26975",//https://celigo.atlassian.net/browse/IO-86853
  // "T26976",//https://celigo.atlassian.net/browse/IO-86853
  // "T26977",//https://celigo.atlassian.net/browse/IO-86853
  // "T26986",//https://celigo.atlassian.net/browse/IO-86853
  // "T26995",//https://celigo.atlassian.net/browse/IO-86853
  // "C119625",//https://celigo.atlassian.net/browse/IO-86854
  // "C119790",//https://celigo.atlassian.net/browse/IO-86854
  // "C119791",//https://celigo.atlassian.net/browse/IO-86854
  // "C119797",//https://celigo.atlassian.net/browse/IO-86854
  // "C119800",//https://celigo.atlassian.net/browse/IO-86854
  // "C119802",//https://celigo.atlassian.net/browse/IO-86854
  // "C119804",//https://celigo.atlassian.net/browse/IO-86854
  // "C119806",//https://celigo.atlassian.net/browse/IO-86854
  // "C119807",//https://celigo.atlassian.net/browse/IO-86854
  // "C119808",//https://celigo.atlassian.net/browse/IO-86854
  // "C119809",//https://celigo.atlassian.net/browse/IO-86854
  // "C119812",//https://celigo.atlassian.net/browse/IO-86854
  // "C119816",//https://celigo.atlassian.net/browse/IO-86854
  // "C119817",//https://celigo.atlassian.net/browse/IO-86854
  // "IO-T31943",//https://celigo.atlassian.net/browse/IO-86854
  // "IO-T31974",//https://celigo.atlassian.net/browse/IO-86854
  "IO50904",
  "IO50942",
  "IO51317",
  "IO51323",
  "IO60215",
  "IO60432",
  "C117742",
  "C117948",
  "T28954",
  "C119139",
  "C117947_C117945",
  "C117946",
  "C117741",
  "C117740",
  "C117743",
  "C117753",
  "T25361",
  "T27372",
  "T27371",
  "T27370",
  "T27368",
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
  "T3097",
  "T24276_T27516",
  "T24277_T24278_T24283",
  "T24279",
  "T24280",
  "T24284",
  "T24285",
  "T10043",
  "T28451",
  "T28427_T28433_T28435",
  "T28428_T28434_T28436",
  "T28429",
  "T28430",
  "T28431",
  "T28432",
  "T28606",
  "T28445",
  "T24261",
  "T5391",
  "IO-T28495",
  "IO-T28452",
  "C120099",
  "C120101",
  "C120112",
  "C120220",
  "T27537",
  "IO-T29045",
  "T29031",
  "IOT6768",
  "IO-T29359",
  "CT6794",
  "IO-T31360",
  "IO-T32338",
  "IO-T32023",
  "T17166",
  "T6094",
  "IO-T10748",
  "T11648_T11645_T11653",
  "C51541",
  "C59677",
  "T5409",
  "T5388_T5387",
  "T1646",
 //please donot add any more new test cases to this flowbuilder02 suite,already this suite is overloaded when might cause issues during jenkinsrun/ci build
];
  
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();