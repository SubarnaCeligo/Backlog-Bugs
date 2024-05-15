import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C1569",
  "C106831",
  "C24939",
  "C24946",
  "C24955",
  "C24940",
  "C24947",
  "C24949",
  "C24969",
  "C24936",
  "C24944",
  "C24953",
  "C24941",
  "C24948",
  "C24950",
  "C24970",
  "C1560",
  "C21309",
  "C21310",
  // "C21311", //Not valid with new UI changes so commenting this
  "C93693",
  "C93697",
  "C93701",
  "C93705",
  "C93713",
  "C93720",
  "C93709",
  "C93703",
  "C93699",
  "C93695",
  "C93715",
  "C93722",
  "C93707",
  "C93711",
  "C47952",
  "C119145",
  "C119151",
  "C118391_C118392_C118749",
  "C25997",
  "C25999",
  "C41561",
  "C41552",
  "C41559",
  "C26856",
  "T29125",
  "C41550"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();