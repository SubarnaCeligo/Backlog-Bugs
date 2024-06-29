import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C108694.json";

test.describe("TC_C108694 Verify the hotspot icons for Flow branching flow where first matching conditions has been set after the test run", () => {
  let flowId;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Zephyr-IO-T23953 @Env-IAQA @Env-STAGING C108694 Verify the hotspot icons for Flow branching flow where first matching conditions has been set after the test run", async ({
    io,
    page
  }) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(Flow);
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON_TOP_XPATH
    );
    let exportTransferHotSpotIcon = page
      .locator(selectors.exportsPagePO.TRANSFER_HOTSPOT_ICON)
      .nth(0);
    await exportTransferHotSpotIcon.waitFor({state : 'visible', timeout : 500000});
    await io.assert.expectToBeTrue(await exportTransferHotSpotIcon.isVisible(), 'Export Transfer HotSpot Icon is Hidden');
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.BRANCHING_HOTSPOT_ICON,
      "Hotspot icons is not available on Branching"
    );
  });
});
