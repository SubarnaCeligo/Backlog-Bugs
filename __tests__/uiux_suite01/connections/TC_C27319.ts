import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C27319 Verify the logs are shown correctly when scripts and connections are opened at a time", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test("@Zephyr-IO-T4946 @Env-All @Priority-P2 TC_C27319 Verify the logs are shown correctly when scripts and connections are opened at a time", async ({ io, page }, testInfo) => {
    
    // Navigate to default integration
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]);
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    // Search for a flow
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Branching_Scheduling_DND');
    await io.connectionPage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.homePagePO.INTEGRATION_NAME, 0);
    
    // Wait for search to complete
    await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.connectionPage.loadingTime();

    // Open the flow
    await io.flowBuilder.clickByText('Branching_Scheduling_Flow_DND');
    // await io.integrationPage.getByRoleClick('link','Branching_Scheduling_DND' );

    // Open connections tab
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CONNECTIONS_TAB);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CONNECTIONS_TAB);

    // Open actions menu and click on 'Debug Connection'
    await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DEBUG_CONNECTION);

    // Open Script debugger
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCRIPTS);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ACTIONS_SELECTOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_EXECUTION_LOGS);

    await io.flowBuilder.clickByText("Last 15 minutes");
    await io.flowBuilder.clickByText("Yesterday");
    await io.flowBuilder.clickByText("Apply");

    // Verfiy Script Log displayed
    await page.getByText("Fetching logs...", { exact: false }).waitFor({ state: `visible`, timeout: 30000 })
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.PAUSEFETCH,"The logs should be shown correctly.");
  });
});