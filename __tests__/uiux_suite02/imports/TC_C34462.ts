import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ashu-g TC_C34462 Verify whether the debugger is enabled then the remaining time must be shown on the panel", () => {
    test.afterEach(async ({ io }) => {
        // Delete the created flow and import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSELOGS);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
        
        // Delete the flow
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
        //confirm  delete 
        await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
        await io.flowBuilder.loadingTime();

        // Delete the import
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C34462');
        // Wait for search to complete
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
        // confirm  delete 
        await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
        await io.homePage.loadingTime();
    });
  
    test("@Epic-IO-20147 @Priority-P1 @Zephyr-IO-T6146 @Env-All TC_C34462 Verify whether the debugger is enabled then the remaining time must be shown on the panel", async ({ io, page }) => {
        // create import
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_INPUT, "HTTP ZENDESK CONNECTION");
        await io.homePage.clickByText("HTTP ZENDESK CONNECTION");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'TC_C34462');
        await io.flowBuilder.click(selectors.importPagePO.SELECTHTTPMETHOD);
        await io.flowBuilder.click(selectors.importPagePO.HTTPPOSTMETHOD);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);

        // verify debug logs button is displayed on import
        await io.flowBuilder.waitForElementAttached(selectors.importPagePO.CLICKIMPORT);
        await io.flowBuilder.click(selectors.importPagePO.CLICKIMPORT);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG, 'View Debug Logs');

        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        // click 'Start debug'
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);

        // click 'Apply' and very remaining time is shown
        await io.flowBuilder.clickByText('Apply');
        await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.REFRESH_RESOURCE, '15m remaining');
  });
});