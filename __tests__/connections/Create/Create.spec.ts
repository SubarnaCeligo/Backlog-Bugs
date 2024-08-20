import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  // "040_Create_Connection_AS2",
  "C2588",
  // "C26484", Excluding from execution because GDrive has been migrated to HTTP2.0
  //Trackers: https://celigo.atlassian.net/browse/CON-8238 & https://celigo.atlassian.net/browse/IO-79313
  "BigQueryConnection",
  "C34887",
  "C59412",
  "003_Create_Connection_FTP",
  "C15753",
  "C2245",
  "027_Create_Connection_Mssql",
  "C12034",
  "C15857",
  "028_Create_Connection_Mysql",
  "C29068",
  // "C57803",
  "037_Create_Connection_DynamoDB",
  "C60468",
  "C41045",
  "C40112_Create_Connection_AmazonRedshift",
  "C21430",
  "C63027",
  "011_Create_Connection_REST_Token",
  "C32180",
  "C27953",
  "017_Create_Connection_HTTP_Basic_JSON_Zendesk",
  "IO-T4387",
  "IO-T2943",
  "C26485",
  "029_Create_Connection_Slack",
  // "C26466",Excluding from execution because GDrive has been migrated to HTTP2.0
  //Trackers: https://celigo.atlassian.net/browse/CON-8238 & https://celigo.atlassian.net/browse/IO-79313
  "IOT4047",
  "C36996",
  "C52794",
  "IO-T32340",
  "IO-T32353",
  "C58600",
  "IOT7942",
  "T31330",
  "T21523",
  "T25986",
  "T17069",
  "IO-T37309",
  "IO-T37310",
  "IO-T373",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "Create");
})();
