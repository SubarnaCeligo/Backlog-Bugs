import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/Filter_Automation02.json";

test.describe("C118039 Verify that clicking on 'Clear filter' button closes the filter dropdown and checks 'All errors'", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T20057 C118039 Verify that clicking on 'Clear filter' button closes the filter dropdown and checks 'All errors'", async ({
    io,
    page
  }) => {
    //Navigate to default integration
    flowId = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 4);
    await page
      .locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS)
      .waitFor({
        state: "visible",
        timeout: 180000
      });

    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );

    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Apply a filter
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.clickByText("Myself");
    await io.flowBuilder.click(selectors.filterErrorTag.APPLYYAGSSELECTOR);
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the checkbox
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    await io.flowBuilder.click(selectors.filterErrorTag.CLEARTAGSSELECTOR);
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.ARROW_POPPER
    );
    const isChecked = await page
      .locator(selectors.filterErrorTag.ALLERRORSCHECKBOX)
      .isChecked();
    await io.assert.expectToBeTrue(isChecked, "All errors checked");
  });
});
