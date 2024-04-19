import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25582_Verify the sub header (containing pagination, debugger, refresh logs button) is aligned correctly with proper spacing b/w actions when Celigo side pane is minimized", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C25582_Verify the sub header (containing pagination, debugger, refresh logs button) is aligned correctly with proper spacing b/w actions when Celigo side pane is minimized UI_Backlog", async ({ io}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.clickByText("Create from scratch")
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C25882');
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Basic');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKUSERNAME} input`, 'Account')
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKPASSWORD} input`, 'Account123')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
       // Validating debugger, refresh logs button available
       await io.assert.verifyElementDisplayedByText("View listener debug logs", 'View listener debug logs not available')
       await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.REFRESH_LOG, 'Refresh icon not available')
    });
}); 
