import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
"T28999_T29000_T29004_T29029",
"T29007",
"T29003",
"T29006",
"T29009",
"T29010",
"T29011",
// "T29012",
"T29015",
"T29018",
"T29019",
"T29020",
"T29013",
"T29021_T29022",
"T29023",
"T29024",
"T29025",
"T29016_T29026",
"T29002_T29883",
"T29030",
"T29008",
"T29014_T29017",
"T32632",
"T12559",
"T12354",
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "dashboard");
})();
