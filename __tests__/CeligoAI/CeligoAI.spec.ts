import { filterTestCases } from "@celigo/aut-utilities"
var testCases = [
  "C110485",
  "C110486",
  "C110487",
  "C110488",
  "C110489",
  "C110490",
  "C112021",
  "C112698",
  "C115168",
  "C110832",
  "C117451",
  "C117448",
  "C119632",
  "C119633",
  "C119140",
  "C119146",
  "C119207",
  "C117471",
  "IO-T27401",
  "IO27437",
  "T30146",
  "IO-T31906",
  "IO-T32859",
  "IOT32866",
  "T35486"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);

(async () => {
  await filterTestCases(testCases, flakycases);
})();