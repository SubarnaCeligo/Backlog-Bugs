import { test, expect } from "@celigo/ui-core-automation";
import testdata from "../../../testData/EM2.0/C51671.json";
import { randomNumber } from "@celigo/aut-utilities";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT19823 Verify the ""HTTP request"" tab in the ""Error details"" drawer`, () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test(`@Zephyr-IO-T19823 @Env-All C51671 Verify the ""HTTP request"" tab in the ""Error details"" drawer`, async ({
    io,
    page
  }) => {
    testdata.name = testdata.name + randomNumber();
    flowId = await io.createResourceFromAPI(testdata, "FLOWS");

    //Wait for flow run to complete
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.integrationPage.clickButtonByIndex(selectors.basePagePO.RUNFLOW, 0);
    let flowID = await io.api.getFlowId(testdata.name);
    await io.api.verifyFlowStatusThroughAPI(
      "EDI_RefreshTest_Flow_DND",
      flowID,
      [0, 1, 0]
    );
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.reloadPage();
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.loadingTime();

    expect(await io.flowBuilder.isVisible('text="Other"')).toBe(true);
    expect(await io.flowBuilder.isVisible('text="Headers"')).toBe(true);
    expect(await io.flowBuilder.isVisible('text="Body"')).toBe(true);
    expect(await io.flowBuilder.isVisible('text="Add to batch"')).toBe(true);
    expect(await io.flowBuilder.isVisible('text="Resolve & next"')).toBe(true);
    const element = page.locator('text=Add to batch');
    await element.hover();
    expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2DOT0PO.ADD_TO_BATCH_HOVER_LABEL)).toBe(true);

  });
});
