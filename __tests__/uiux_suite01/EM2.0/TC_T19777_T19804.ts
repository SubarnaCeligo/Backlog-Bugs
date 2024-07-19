import { test, expect } from "@celigo/ui-core-automation";
import testdata from "../../../testData/EM2.0/C51671.json";
import { randomNumber } from "@celigo/aut-utilities";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_T19777_T19804 Verify by hovering over the error row and also Verify by hovering over the error row in the ""New View"" by navigating from the Current View`, () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test(`@Zephyr-IO-T19777_T19804 @Env-All T19777_T19804 Verify by hovering over the error row and also Verify by hovering over the error row in the ""New View"" by navigating from the Current View`, async ({
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
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.LIST_VIEW_ERRORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.LIST_VIEW_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.TOGGLE_VIEW_DROPDOWN);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SPLIT_VIEW_ERRORS);
    expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2DOT0PO.HEADERS)).toBe(false);
    await io.flowBuilder.addStep("Selecting the first error from the list");
    const errorRows = await page.$$(selectors.flowBuilderPagePO.EM2DOT0PO.OPEN_ERRORS_TABLE_ROWS);
    await errorRows[0].click();
    expect(await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EM2DOT0PO.HEADERS)).toBe(true);

  });
});
