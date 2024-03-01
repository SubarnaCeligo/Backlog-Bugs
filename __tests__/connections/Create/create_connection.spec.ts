import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "037_Create_Connection_DynamoDB",
  "BigQueryConnection",
  "003_Create_Connection_FTP",
  "027_Create_Connection_Mssql",
  "028_Create_Connection_Mysql",
  "C40112_Create_Connection_AmazonRedshift",
  "011_Create_Connection_REST_Token",
  "017_Create_Connection_HTTP_Basic_JSON_Zendesk",
  "029_Create_Connection_Slack",
  "040_Create_Connection_AS2",
  "C2588",
  "C59412",
  "C15753",
  "C2245",
  "C12034",
  "C15857",
  "C29068",
  "C57803",
  "C63027"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "Create");
})();