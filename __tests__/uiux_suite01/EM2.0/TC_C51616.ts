import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/EM2.0/C51616.json";

test.describe("TC_C51616 Verify the presence and functionlaity of the 'Select view' option in the Current view", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  
  test("@Zephyr-IO-T19768 @Env-All C51616 Verify the presence and functionlaity of the 'Select view' option in the Current view", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 2);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.assert.checkElementState(selectors.basePagePO.TOGGLE_BTN_ERROR_DETAILS, "isVisible");
    await io.homePage.addStep("Select View dropdown is visible in Current View")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PANELICON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PANELICON1);
    await io.flowBuilder.addStep("User can able to navigate from Current View to Selected View");
  });
});
