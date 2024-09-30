
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C23891", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7434 TC_C23891|Verify user can download the Diagnostic report from the Run history Action column", async ({io,page}, testInfo) => {
    test.step("Clicking on the flow TC_C23895_DND", async ()=>{});
    var flowId = await io.api.getFlowId("TC_C23895_DND");

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
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
    test.step("Donload Diagnostics is being shown", async ()=>{});
    await io.assert.expectToBeTrue(downloadDiagnostics, "");
  });
});
