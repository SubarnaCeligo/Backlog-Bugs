import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import playload from "@testData/profile/updatePreference.json"

test.describe(`@Author_sagna123 TC_T26356_Changing the implementation for uploading template zip.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        playload.showRelativeDateTime = true;
        await io.api.putCall('v1/preferences',playload);
    });
    test(`@Priority-P2 @Zephyr-IO-T26356 @Env-QA`, async ({
        io,
        page
    }) => {
        await io.homePage.clickByText("Resources");
        await io.homePage.clickByText("Templates");
        await io.homePage.addStep("Navigated to templates page");
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "TC_T26356_TEMPLATE_DND");
        await io.homePage.addStep("Searched for template");
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.homePage.addStep("Clicked on actions menu");
        await io.homePage.clickByText("Upload template zip");
        await io.homePage.addStep("Clicked on upload template zip ");
        // const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await io.homePage.zipUpload('testData/inputData/Templates/TC_T26356_template_DND.zip');
        await io.homePage.addStep("Uploaded zip file");
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.waitForElementAttached(selectors.myAccountPagePO.LOCAL_DATE_TIME);
        const timestampText = await io.flowBuilder.getText(selectors.myAccountPagePO.LOCAL_DATE_TIME);
        await io.assert.expectToBeValue(timestampText.toString(), "Just now", 'Timestamp does not match the expected value');
        await io.homePage.addStep("Verified the time stamp as justnow ");
    });
});