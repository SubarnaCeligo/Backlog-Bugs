
import { test } from "@celigo/ui-core-automation";
import TC1 from "@testData/STANDALONE/TC_C56874.json";

test.describe("TC_C56874", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C56874 @Env-All @Zephyr-IO-T15585", async ({ io, page }, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC1);
    flowId = flows.get(TC1.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(TC1.name)["flowName"], async () => { }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(TC1.name, flows.get(TC1.name)["flowId"],
      [2, 0, 0]
    );
    var resultJSON = await io.flowBuilder.validateJobCountFromDashBoard(TC1.name, TC1.qa__expectedDashboardCount)

  });
});