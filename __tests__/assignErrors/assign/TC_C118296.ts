import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C118296 - Batch action - Verify 'Assign error' dropdown when no errors are selected", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T20070 C118296 - Batch action - Verify 'Assign error' dropdown when no errors are selected", async ({ io, page }) => {
    //Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();

    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Filter_Automation01_DND');
    
    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);

    //Open the flow
    await io.flowBuilder.clickByText('Filter_Automation01_DND');
    await io.homePage.loadingTime();
    let accountErrorsDashBoardIsDisplayed = await page.locator(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    ).isHidden();
    if (accountErrorsDashBoardIsDisplayed) {
      await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
      await io.flowBuilder.delay(1000 * 60 * 4);
      await page.locator(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS).waitFor({
        state: "visible",
        timeout: 180000
      });
    }
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);

    //Click on Assign error button on top bar
    await io.flowBuilder.click(selectors.em2DotOLineGraphPO.ASSIGN_ERRORS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ARROW_POPPER);

    //Verify if assign error label is visible
    const label = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ASSIGN_ERROR_LABEL)).toString();
    await io.assert.expectToBeValue("Assign errors", label, 'Assign error label is not visible');

    //Verify error selected text
    const message = (await io.flowBuilder.getText(selectors.em2DotOLineGraphPO.ERROR_SELECTED_TEXT)).toString();
    await io.assert.expectToBeValue("No errors selected.", message, 'Message is not visible');

    //Help text for assign error.
    await io.flowBuilder.clickButtonByIndex(selectors.em2DotOLineGraphPO.ASSIGN_HELPTEXT, 0);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_INFO_TEXT);
    const helpText1 = (await io.flowBuilder.getText(selectors.flowBuilderPagePO.PAGE_INFO_TEXT)).toString();
    await io.assert.expectToContainValue(
      'Only users with access to the integration are shown in the assignee list. Assignees will be notified via email.',
       helpText1,
      'Helptext not displayed'
    );

  });
});