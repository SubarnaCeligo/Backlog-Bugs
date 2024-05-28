import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
"C27421", 
"C27422",
"C27423",
"T28944_T28945_T28946_T28947",
"T28948",
"T28959",
"T29065",
"C27421",
"C28952",
"C28955",
"C28960",
"C29062",
"C29064",
"C29063",
"C29068",
"C28951",
"T29046",
"T29724",
"T29351",
"T28742_T28743_T28737_T28736",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();
