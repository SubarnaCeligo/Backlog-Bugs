import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C44396",
  "C44421",
  "C44937",
  "C46906",
  "C46907",
  "C46908",
  "C46912",
  "C46914",
  "C46915",
  "C48904",
  "C48963",
  "C51116",
  "C51954",
  "C51986",
  "C52754",
  "C53141",
  "C53149",
  "C65721",
  "C120845",
  "C45346"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "mapper2.0");
})();
