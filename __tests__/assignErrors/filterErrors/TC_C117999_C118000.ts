import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117998_C118000 Verify the search feature with a successful/unsuccessful search", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20052 @Zephyr-IO-T20054 Verify the search feature with a successful search", async ({
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
      "Filter_Automation01_DND"
    );

    //Open the flow
    await io.flowBuilder.clickByText("Filter_Automation01_DND");
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

    //Validate search feature(valid search)
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    await io.flowBuilder.fill(
      selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "invalid_string"
    );

    const isMyselfDisplayed = await io.flowBuilder.isVisible('text="Myself"');
    await io.assert.expectToBeTrue(isMyselfDisplayed, "Search failed");
    const isUnassignedDisplayed = await io.flowBuilder.isVisible('text="Unassigned"');
    await io.assert.expectToBeTrue(isUnassignedDisplayed, "Search failed");

    //Validate search feature(valid search)
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    await io.flowBuilder.fill(
      selectors.filterErrorTag.ARIALABELSEARCHUSER,
      "Custom User1"
    );

    const isUserDisplayed = await io.flowBuilder.isVisible('text="Custom User1"');
    await io.assert.expectToBeTrue(isUserDisplayed, "Search failed");
  });
});
