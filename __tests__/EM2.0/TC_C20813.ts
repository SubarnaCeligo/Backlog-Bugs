
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20813 from "@testData/EM2.0/TC_C20813.json";

test.describe("TC_C20813", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7391 |Verify Cancel run button", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C20813);
await test.step(
      "Created Flow " +
        flows.get(TC_C20813.name)["flowName"] +
        " With ID " +
        flows.get(TC_C20813.name)["flowId"],async () => {
          
        }
    );

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C20813.name,
      flows.get(TC_C20813.name)["flowId"],
      [0, 0, 1]
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C20813.name)["flowId"]
    );

    const cancelBtn = await page.locator(selectors.integrationPagePO.CANCEL_FLOW_RUN);
await test.step(
      "Verifying if the Cancel run is disabled by default"
, async ()=>{});
    let isEnabled = await cancelBtn.isVisible();
    expect(isEnabled).toBeFalsy();

    test.step("Running the flow", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );

await test.step(
      "Verifying if the Cancel run is enabled when the Flow runs"
, async ()=>{});
    await cancelBtn.isVisible();
    isEnabled = await cancelBtn.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "");
  });
});
