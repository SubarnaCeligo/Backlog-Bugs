import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118280 Verify the filter feature on resolved errors section by applying both user and tag filter", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T20062 C118280 Verify the filter feature on resolved errors section by applying both user and tag filter", async ({
    io,
    page,
  }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
  
    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Filter_Automation02_ResolvedErrors_DND"
    );

    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText("Filter_Automation02_ResolvedErrors_DND");

    //Open errors dashborad
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Assign errors
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);
    await io.flowBuilder.clickByText('Assign to me');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
 
    //Assign tags
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.TAG_ERRORS);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SELECT_TAG,0);
    await io.flowBuilder.clickByText('Apply');
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX);
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.SELECT_ERROR_CHECKBOX, 1);
    await io.flowBuilder.clickByText('Resolve & next');

    // await page.pause();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVED_ERRORS_TAB);
    await io.flowBuilder.reloadPage();

    //Click on Filter Icon
    await io.flowBuilder.waitForElementAttached(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.flowBuilder.click(selectors.filterErrorTag.ARIALABELFILTERERROR);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Apply filter involving user and tag
    await io.flowBuilder.clickByText("Myself");
    await io.flowBuilder.clickByIndex(selectors.em2DotOLineGraphPO.TAGS_FILTERBOX,0);
    await io.flowBuilder.clickByText("Apply");
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGNEE_PILL);

    const isTagDisplayed = await io.flowBuilder.isVisible('text="Admin_Tag"');
    await io.assert.expectToBeTrue(isTagDisplayed, "Admin_Tag not displayed");
    const isUserDisplayed = await io.flowBuilder.isVisible('text="Assign Error Owner"');
    await io.assert.expectToBeTrue(isUserDisplayed, "Assign Error Owner not displayed");


  });
});