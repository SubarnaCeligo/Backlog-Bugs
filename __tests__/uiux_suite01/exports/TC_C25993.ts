import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25993_Verify the the duration options are:Next 15 minutes,Next 30 minutes, Next 45 minutes and Next 60 minutes", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T4849 C25993_Verify the the duration options are:Next 15 minutes,Next 30 minutes, Next 45 minutes and Next 60 minutes UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.clickByText("Create from scratch")
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C25993');
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Basic');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKUSERNAME} input`, 'Account')
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKPASSWORD} input`, 'Account123')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
        await io.flowBuilder.clickByText('Start debug');
        await io.flowBuilder.clickByText('Next 15 minutes');
        // Validating view timestamp duration
        await io.assert.verifyElementDisplayedByText('Next 30 minutes', "Timestamp is not showing")
        await io.assert.verifyElementDisplayedByText('Next 45 minutes', "Timestamp is not showing")
        await io.assert.verifyElementDisplayedByText('Next 60 minutes', "Timestamp is not showing")
    });
}); 
