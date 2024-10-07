
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20847 from "@testData/EM2.0/TC_C20847.json";

test.describe("TC_C20847", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7392 |Verify display of Success count of Export", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C20847);
    var flowId = flows.get(TC_C20847.name)["flowId"];
await test.step(
      "Created Flow " + TC_C20847.name + " With ID " + flowId
, async ()=>{});

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C20847.name,
      flowId,
      [5, 0, 5]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.loadingTime();
    test.step("Reading the Success count Export", async ()=>{});
    var successCount = (await io.homePage.getText("table > tbody > tr  > td:nth-child(3)")).toString();
    await console.log(successCount);
await test.step(
      "Verifying if the Success count is greater than or equal to 1"
, async ()=>{});
    expect(parseInt(successCount)).toBeGreaterThanOrEqual(1);
  });
});
