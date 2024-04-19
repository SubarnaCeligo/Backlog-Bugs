import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25987_verify when I am on the 'View debug logs' page, I can see debug run status", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C25987_verify when I am on the 'View debug logs' page, I can see debug run status UI_Backlog", async ({ io}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.clickByText("Create from scratch")
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C25987');
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Basic');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKUSERNAME} input`, 'Account')
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKPASSWORD} input`, 'Account123')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
       // Validating run status available
       await io.assert.verifyElementDisplayedByText("Response code", 'Run status not available')
    });
}); 
