import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "IO52927", // We are making this test case obsolete as we have removed "existing export" checkbox from UI (functionality is changed for this)
  "IO50904",
  "IO50942",
  "IO51317",
  "IO51323",
  "IO60215",
  "IO60432",
  "C117742",
  "C117948",
  "T28954",
  "C119397",
  "C119625",
  "C117949",
  "C119139",
  "C117947_C117945",
  "C117946",
  "C117741",
  "C117740",
  "C117743",
  "C117753",
  "C119791",
  "C119816",
  "C119817",
  "C119790",
  "C119797",
  "C119800",
  "C119802",
  "C119804",
  "C119806",
  "C119808",
  "C119809",
  "C119812",
  "C119807",
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
  "IO-T31943",
  "IO-T31360",
  "IO-T32338",
  "IO-T31974",
  "IO-T32023",
  "T17166",
  "T6094"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();