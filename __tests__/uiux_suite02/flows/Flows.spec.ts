import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  'C107033',
  'C96888',
  'C22854',
  'C42087',
  'C106448',
  'C107604',
  'C107605',
  'C113932',
  'C113716_C113717_C113721_C113722_C113723_C113724_C113785_C113787',
  'C1458',
  'C1459',
  'C1466',
  'C2203',
  'C22457',
  'C27977',
  'C27978',
  'C28982',
  'C33161',
  'C33167',
  'C45340',
  'C53277',
  'C53278',
  'C56649',
  'C59848',
  'C59978',
  'C59979',
  'C60440',
  "C20808",
  "C24620",
  "C32654",
  "C107735",
  "C107061",
  "C108197",
  "C2035",
  "IO-T22286",
  "IOT23482"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "flows");
})();
