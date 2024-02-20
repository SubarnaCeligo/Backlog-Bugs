import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  "C52048",
  "C51630",
  "C51644",
  "C51653",
  "C51662",
  "C51669",
  "C23442",
  "C51530",
  "C51626",
  "C51627",
  "C51638",
  "C51639",
  "C51643",
  "C51655",
  "C51656",
  "C51658",
  "C51661",
  "C51672",
  "C52094",
  "C51302",
  "C51628",
  "C51637",
  "C51664",
  "C52047",
  "C50858",
  "C51623",
  "C20896",
  "C50859",
  "C69561",
  "C107439",
  "C106997",
  "C69107",
  "C66296",
  "C68566",
  "C19930",
  "C27641",
  "C51620"
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "EM2.0");
})();
