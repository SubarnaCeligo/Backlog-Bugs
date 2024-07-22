import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C27965",
  "C27969",
  "C28172",
  "C28173",
  "C22915",
  "C94287",
  "C64846",
  "C65758",
  "C65759",
  "C67232",
  "C65696",
  "C58484",
  "C27545",
  "C22817",
  "C69769",
  "C113465",
  "C22828",
  "C120059",
  "C28883",
  "C2044",
  "C19744",
  "C19743",
  "C25984",
  "C26004",
  "C26026",
  "C106839",
  "C106840",
  "C26006",
  "C25575",
  "C18471",
  "C26002",
  "C26029",
  "C25988",
  "C25993",
  "C25998",
  "C25810",
  "C25811",
  "C25985",
  "C25987",
  "C25989",
  "C25574",
  "C25582",
  "C25994",
  "C26000",
  "IO-T2957",
  "C30441",
  "C26030",
  "C26009",
  "C26008",
  "C27337",
  "C32179",
  "C2457",
  "C26003",
  "C25995",
  "C26015",
  "T28409_T28411",
  "T28410",
  "T28413",
  "T28414",
  "T28415_T28438_T28439_T28440",
  "T28416_T28441_T28442_T28443",
  "T28417_T28454_T28455_T28456",
  "T284932",
  "T731",
  "T833",
  "T28851",
  "C107148",
  "C107128",
  "T26351",
  "C108199",
  "T29672_T29673",
   "T29674",
   "T29675",
  "T29676",
   "T29677",
   "T29678",
   "T29679",
  "T29680",
   "T29681_T29682",
   "T29683_T29684",
   "T29685_T29686_T29687",
   "T29688_T29689",
   "T29690_T29695",
  "T29691_T29692",
  "T29693_T29696",
   "T29694",
  "T29697",
  "IOT2505",
  "T7901",
  "T32707",
  "T32822",
  "IO-T33009",
  "C106842",
  "C22764",
  "C2860",
  "C51602",
  "C51601",
  "C28913",
  "C51812",
  "IOT23800",
  "IO-T33009",
  "C53129",
  "T25510",
  "C53288",
  "T11409"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "exports");
})();
