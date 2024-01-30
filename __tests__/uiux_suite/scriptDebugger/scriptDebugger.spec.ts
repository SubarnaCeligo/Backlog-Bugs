import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C93648",
  "C93649",
  "C93650",
  "C93651",
  "C93652",
  "C93653",
  "C93655",
  "C93657",
  "C93658",
  "C93660",
  "C93661",
  "C93662",
  "C93663",
  "C93664",
  "C93665",
  "C93666",
  "C93667",
  "C93668",
  "C93669",
  "C93670",
  "C93671",
  "C93672",
  "C93673",
  "C93674",
  "C93675",
  "C93676",
  "C93677",
  "C93679",
  "C93680",
  "C93681",
  "C93682",
  "C93684",
  "C93685",
  "C93687",
  "C93688",
  "C93689",
  "C93690",
  "C93692",
  "C93694",
  "C93696",
  "C93698",
  "C93700",
  "C93702",
  "C93704",
  "C93706",
  "C93708",
  "C93710",
  "C93712",
  "C93714",
  "C93716",
  "C93719",
  "C93721",
  "C93819",
  "C93820",
  "C93821",
  "C93822",
  "C93823",
  "C93824",
  "C93825",
  "C93826",
  "C93827",
  "C93828",
  "C93829",
  "C93830",
  "C93831",
  "C93832",
  "C93833",
  "C93834",
  "C93835",
  "C93836",
  "C93839",
  "C93840"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "scriptDebugger");
})();