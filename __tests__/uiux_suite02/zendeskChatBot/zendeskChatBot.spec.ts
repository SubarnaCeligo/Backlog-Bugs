import { filterTestCases } from "@celigo/aut-utilities";
var testCases = [
  // "C55915",
  // "C55917",
  // "C66905",
  // "C66906",
  // "C55918",
  // "C55928",
  // "C55930",
  // "C55934",
  // "C55936"
  // These test cases are obselete, will delete these files once they are removed from zephyr scale.
];
var flakycases = JSON.parse(process.env.FLAKY_TEST_CASES);
(async () => {
  await filterTestCases(testCases, flakycases, "zendeskChatBot");
})();
