import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "040_Create_Connection_AS2",
  "C2588",
  "C26484",
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
  "C57803",
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
  "C26466",
  "IOT4047",
  "C36996"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "Create");
})();
