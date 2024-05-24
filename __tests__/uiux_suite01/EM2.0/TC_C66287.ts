import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C66287 from "@testData/EM2.0/C66287.json";

test.describe("TC_C66287 Verify the display text will auto adjust to the full character length of the username field", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });
  test("@Zephyr-IO-T20415 @Env-All C66287 Verify the display text will auto adjust to the full character length of the username field", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C66287, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.click(selectors.integrationPagePO.CANCEL_FLOW_RUN);
    await io.flowBuilder.clickByTextByIndex("Cancel run", 0);
    await io.flowBuilder.delay(1000 * 60 * 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.flowBuilder.click(selectors.basePagePO.TOOLTIP);
    await io.assert.expectToBeTrue(await (page.locator("text='Canceled by Automation Account'").first()).isVisible(), "New API is not visible");
  });
});
