import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Flow from "@testData/FlowDebugger/C34539.json";

test.describe("TC_C34539 Verify able to fetch debulogs for CSV media type for HTTP import with header values", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Zephyr-IO-T6211 @Env-All C34539 Verify able to fetch debulogs for CSV media type for HTTP import with header values", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(Flow, "FLOWS");
    await io.homePage.navigateTo(
        process.env["IO_Integration_URL"] + "flowBuilder/" + id
      );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
    await io.flowBuilder.clickByTextByIndex("Start debug", 0);
    await io.flowBuilder.clickByTextByIndex("Apply", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_LOG);
    await io.flowBuilder.click(selectors.basePagePO.CLOSE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB);
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    let debugLogs = page.locator(selectors.flowBuilderPagePO.RESPONSE_CONTENT);
    await debugLogs.waitFor({state: 'visible', timeout: 500000});
    await io.assert.expectToBeTrue(await debugLogs.isVisible(), "Debug Logs is not visible");
  });
});
