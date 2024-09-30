import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C102620",
  "IO-T34774",
  "IO-T34771",
  "IO-T34772",
  "IO-T33536",
  "IO-T34774",
  "T17086_T17088",
  "T18947_T18949_T18948",
  "IO-T35026",
  "IO-T34557",
  "IO-T35133",
  "T24316",
  "T28953_T15739",
  "T9950",
  "C93991",
  "IO-T35642",
  "T5410",
  "IO-T35692",
  "T35065",
  "T35060",
  "T35062",
  "IO-T33534",
  "IO-T5604",
  "C34783",
  "C66299",
  "IO-T5609",
  "T20433",
  "T34261",
  "IO-T5411",
  "T11996",
  "T22231",
  "T34262",
  "T11503",
  "T22530",
  "T2419_T18016",
  "T23334",
  "T795",
  "C115649",
  "T17393",
  "IO-T24347",
  "T37418",
  "T37419",
  "T37422",
  "T37423",
  "T37424",
  "T37425",
  "T37426",
  "T37427",
  "T37428",
  "T37422",
  // "IO-T37326", IO-87614 Reverted epic changes
  "T37793",
  "IO-T37963",
  "IO-T37516",
  "IO-T37514",
  "IO-T37546",
  "IO-T37530",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases);
})();
