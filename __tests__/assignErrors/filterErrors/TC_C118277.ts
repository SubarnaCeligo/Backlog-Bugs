import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118277 Verify filtering by 'Unassigned' returns only unassigned errors", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20059 C118277 Verify filtering by 'Unassigned' returns only unassigned errors", async ({
    io,
    page,
  }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();

    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Filter_Automation04_DND"
    );

    //Open the flow
    await io.flowBuilder.clickByText("Filter_Automation04_DND");
    await io.homePage.loadingTime();

    let accountErrorsDashBoardIsDisplayed = await page.locator(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    if (accountErrorsDashBoardIsDisplayed.isHidden()) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.flowBuilder.delay(1000 * 60 * 4);
      await accountErrorsDashBoardIsDisplayed.waitFor({
        state: "visible",
        timeout: 180000
      });
    }
    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

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
