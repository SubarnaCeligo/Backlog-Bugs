import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C110781_C110787_C110788_C111507",
  "T833",
  
  "C102708",
  "C107972",
  "C117407",
  "C47425",
  "C47992",
  "C49537",
  "C49539",
  "C59975",
  "C59977",
  "C68107",
  "C68488",
  "C68531",
  "C69565",
  "C93992",
  "C93993",
  "C93994",
  "C93995",
  "C93996",
  "C93997",
   "T37844",
  "T37847",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
