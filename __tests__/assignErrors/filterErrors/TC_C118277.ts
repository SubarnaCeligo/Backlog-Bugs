import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C118299.json";

test.describe("C118277 Verify filtering by 'Unassigned' returns only unassigned errors", () => {
  let flowId;

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T20059 C118277 Verify filtering by 'Unassigned' returns only unassigned errors", async ({
    io,
    page,
  }) => {
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
    await io.flowBuilder.loadingTime();
    //Click on Filter Icon
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);

    //Validate the contents
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    await io.flowBuilder.clickByText("Unassigned");

    // Click Apply
    await io.flowBuilder.click(selectors.filterErrorTag.APPLYYAGSSELECTOR);

    const assigneePillsDisplayed = await io.assert.checkElementState(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL,'isDisplayed');
    await io.assert.expectToBeFalse(assigneePillsDisplayed, 'Unassigned filter did not work');

  });
});
