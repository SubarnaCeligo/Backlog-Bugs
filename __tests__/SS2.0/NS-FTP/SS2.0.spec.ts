import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C107885",
  // "C107916",
  // "C21262",
  // "C42590",
  // "C45345",
  // "C107857",
  // "C107901",
  // "C107906",
  // "C107910",
  // "C107851",
  // "C107841",
  // "C107887",
  // "C107904",
  // "C107893",
  // "C107900",
  // "C107917",
  // "C107853",
  // "C107859",
  // "C107861",
  // "C107882",
  // "C107883",
  // "C107898",
  // "C107903",
  // "C107918",
  // "C107886",
  // "C107897",
  // "C107920",
  // "C107919"s
  // "C107902"
  // "C107914",
  // "C107915",
  // "C107890",
  // "C107852",
  // "C107888",
  // "C107889",
  "C107855"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "NS-FTP");
})();
