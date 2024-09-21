
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C23895", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7438 TC_C23895|Verify the Run history tab is Read only, except Action(Download files, diagnotics)", async ({io, page}) => {
    //*Create Flows
    var flows = "TC_C23895_DND";
    var flowId = await io.api.getFlowId(flows);
    
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flowId
    );
    test.step("Navigated to the created flow", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    test.step("Changed the tab to Run History", async ()=>{});

    await io.homePage.click(
      selectors.integrationPagePO.RUNHISTORYOPTIONS
    );
    test.step("Opened the Actions Menu", async ()=>{});

    const downloadDiagnostics = await page.getByText("Download diagnostics").isEnabled();
    const downloadFile = await page.getByText("Download file").isEnabled();
    await io.assert.expectToBeTrue(downloadDiagnostics, "");
    test.step("Download Diagnostics is being shown", async ()=>{});
    await io.assert.expectToBeTrue(downloadFile, "");
    test.step("Download File is being shown", async ()=>{});  });
});
