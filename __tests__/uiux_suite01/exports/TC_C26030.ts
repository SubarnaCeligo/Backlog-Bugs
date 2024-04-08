import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26030_When debugger is on, log out of IO, log in again, open the debug logs, (you shd see debug time remaining), (send a new log entry), refresh should enable after that", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C26030_When debugger is on, log out of IO, log in again, open the debug logs, (you shd see debug time remaining), (send a new log entry), refresh should enable after that UI_Backlog", async ({ io }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.clickByText("Create from scratch")
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C26030');
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Basic');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKUSERNAME} input`, 'Account')
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKPASSWORD} input`, 'Account123')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.clickByText('Start debug');
        await io.flowBuilder.clickByText('Apply');
         // Validating refresh icon enable in webhook
         await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.REFRESH_LOG, 'Refresh icon disabled')
    });
}); 
