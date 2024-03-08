import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25985_Verify able to click on the 'View debug logs' button and able to access the debug log setting and view debug logs.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C25985_Verify able to click on the 'View debug logs' button and able to access the debug log setting and view debug logs.", async ({ io}) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'webhook');
        await io.flowBuilder.clickByText('Webhook');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C25985');
        await io.flowBuilder.clickByText('Please select');
        await io.flowBuilder.clickByText('Basic');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKUSERNAME} input`, 'Account')
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.WEBHOOKPASSWORD} input`, 'Account123')
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
        await io.flowBuilder.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG);
       // Validating able to navigate to view debug logs
       await io.assert.verifyElementDisplayedByText("View listener debug logs", 'View listener debug logs not available')
    });
}); 
