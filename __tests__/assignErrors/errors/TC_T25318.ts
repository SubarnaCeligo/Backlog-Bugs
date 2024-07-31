import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/T25318.json";

test.describe("TC_T25318 Verify 'Timestamp filter for error window is not visible in TEST MODE", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T25318 @Env-All @Epic-IO-86262 @Priority-P2 - Verify 'Timestamp filter for error window is not visible in TEST MODE", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0);
    const errors = page.locator(selectors.flowBuilderPagePO.JOB_ERRORS);
    await errors.waitFor({state: 'visible', timeout: 500000});
    await io.flowBuilder.click(selectors.flowBuilderPagePO.JOB_ERRORS);
    await io.flowBuilder.loadingTime();

    await io.assert.verifyElementNotBeFound(selectors.basePagePO.TIMESTAMP_ERROR_FILTER);
  });
});