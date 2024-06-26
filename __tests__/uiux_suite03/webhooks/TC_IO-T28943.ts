import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T28943_Verify the user is able to view 'view debug log' after saving the real time listners.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Zephyr-IO-T28943 @Bug-IO-74199 @Env-All Verify the user is able to view 'view debug log' after saving the real time listner webhook.", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T28943');
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Basic');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKUSERNAME} input`, 'Account')
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKPASSWORD} input`, 'Account123')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG, 'view debug not available')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementDisplayedByText("Start debug","Element is not displayed");
        await io.flowBuilder.clickByText('Start debug');
        await io.assert.verifyElementDisplayedByText('Next 15 minutes',"Dropdown option is not displayed properly");
        await io.flowBuilder.clickByText('Apply');
        await io.assert.verifyElementDisplayedByText('15m remaining',"Start debug timer is not displayed properly");
        await io.assert.verifyElementDisplayedByText('Stop debug',"Stop Debug option is not available");
        await io.flowBuilder.clickByText('Stop debug');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.LISTENER,"Element is not displayed properly");
    });
    test("@Zephyr-IO-T28943 @Bug-IO-74199 @Env-All Verify the user is able to view 'view debug log' after saving the real time listner salesforce", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'salesforce');
        await io.flowBuilder.clickByText('Salesforce');
        await io.flowBuilder.clickByText('Listen for real-time data from source application');
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'T28943');
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByText('SALESFORCE CONNECTION');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SF_SOBJECT_TYPE);
        await io.flowBuilder.clickByText('Account');
        await io.flowBuilder.clickByText('Save & close');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG, 'view debug not available')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.assert.verifyElementDisplayedByText("Start debug","Element is not displayed");
        await io.flowBuilder.clickByText('Start debug');
        await io.assert.verifyElementDisplayedByText('Next 15 minutes',"Dropdown option is not displayed properly");
        await io.flowBuilder.clickByText('Apply');
        await io.assert.verifyElementDisplayedByText('15m remaining',"Start debug timer is not displayed properly");
        await io.assert.verifyElementDisplayedByText('Stop debug',"Stop Debug option is not available");
        await io.flowBuilder.clickByText('Stop debug');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.LISTENER,"Element is not displayed properly");
    });
}); 
