
import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C99341",
  "C103075", //This test will fail as we don't have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  "C107375",
  "C107377",
  "C107378",
  "C107921",
  "C109343",
  "C111324_C111325",
  "C111326",
  "C111329",
  "C111337",
  "C111338",
  "C111349",
  "C112065",
  "C112070",
  "C112075",
  "C112080",
  "C112773",
  "C112774",
  "C112776",
  "C112777",
  "C112778",
  "C112779",
  "C113404",
  "C113520",
  "C113527",
  "C113528",
  "C2044",
  "C23866",
  "C51572",
  "C51793",
  "C52775",
  "C52776",
  "C52777",
  "C53343",
  "C53344",
  "C53345",
  "C53346",
  "C55826",
  "C56987",
  "C59643",
  "C59644",
  "C59657",
  "C59658",
  "C59859",
  "C60099",
  "C63002",
  "C63003",
  "C63004",
  "C63005",
  "C63006",
  "C63007",
  "C63008",
  "C63009",
  "C63010",
  "C63011",
  "C63015",
  "C63021",
  "C63022",
  "C63024",
  "C63061",
  "C63062",
  "C63064",
  "C64961",
  "C65462",
  "C65490",
  "C66292",
  //"C67022", //Skipped as per discussion with TC Owner and QA team
  //"C67117", //Skipped as per discussion with TC Owner and QA team
  "C67220",
  "C68717",
  "C68978",
  "C77905",
  "C9473",
  // "C97060", //Skipped as per discussion with TC Owner and QA team
  "CIO44682",
  "C120044",
  "C120045",
  "C120046",
  "C120047",
  "C120048",
  "C120050",
  "C120051",
  "C120052",
  "C120053",
  "C120054",
  "C120055",
  "C120056",
  "C120057",
  "C120058",
  "C98851",
  "C93549",
  "C103903",
  "C39816",
  "C14428",
  "C104752",
  "T4548",
  "T4493",
  "T4470",
  "C106836",
  "IO-T29337",
  "IO-T29344",
  "IO-T29342",
  "IO-T29347",
  "IO-T29346",
  "C27319",
  "C2735",
  "C2034",
  "C51600",
  "C51599",
  "C51607",
  "T31329",
  "T31328",
  "T31327",
  "T31326",
  "T31325",
  "T31331",
  "T11974",
  "C63017",
  "C69583",
  "IOT21440",
  "T23167",
];

var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases, "connections");
})();