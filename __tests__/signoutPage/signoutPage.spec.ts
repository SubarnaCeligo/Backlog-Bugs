import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // // "C65744",//Commenting this as "google sign in" is not working.@sushantceligo is looking into this
  // "C66306",
  // "C66316",
  // "C67008",
  // // "C67037",//Commenting this as "google sign in" is not working.@sushantceligo is looking into this
  // "C66306",
  // "C67038",
  // "C100968",
  // "C57431",
  // "C66318",
  // "C59777",
  // "C59778",
  // "C59779",
  // "C62659",
  // "C62667",
  // "C62760",
  // "C56283",
  // "C60447",
  // "C56284",
  // "C56287",
  // "C56423",
  // "C56428",
  // "C57330",
  // "C56927",
  // "C2816",
  // "C102863",
  // "C1052",
  "C1055",
  "C56291",
  "C1054",
  "C1057",
  "C41259",
  "T968",
  "T1088_T991",
  "IO-T37501",
  "IO-T37502",
  "IO-T37545",
  "IO-T37520",
  "IO-T37507",
  "IO-T37965",
  "IO-T37519",
  "IO-T37517",
  "IO-T37496",
  "C1058",
  "IO-T37493",
  "IO-T37489",
  "IO-T37541",
  "IO-T37495",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
