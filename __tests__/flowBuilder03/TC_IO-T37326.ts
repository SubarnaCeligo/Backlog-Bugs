import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Author_MaheshNivruttiSutar @Zephyr-IO-T37326 @Zephyr-IO-T37327`, () => {
    test.afterEach(async ({ io, page }) => {
        let intId = await io.api.getIntegrationDetails("IO-T37326_Delete", "_id");
        await io.api.deleteIntegration(intId);
    });
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test(`@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37326 @Zephyr-IO-T37327 `, async ({ page, io }) => {
        //IO-T37326 Verify that the ‘Test connection’ button UI is displayed properly while installing integation.
        await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep(
            "Navigated to install integration page (/home/installIntegration)"
        );
        const fileChooserPromise = page.waitForEvent("filechooser");
        await io.homePage.clickByText("Choose file");
        const fileChooser = await fileChooserPromise;
        await fileChooser.setFiles("testData/inputData/Templates/IO-T37326.zip");
        await io.homePage.addStep("Uploaded integration zip file");
        await io.flowBuilder.loadingTime();
        await io.homePage.clickByText("Install integration");
        await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
        await io.flowBuilder.loadingTime();

        //Disabled button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).last();
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RDBMS_HOST_INPUT, "Test");
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.homePage.clickByTextByIndex("POSTGRESQL CONNECTION", 1);
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.INSTALL);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("IO-T37326_Flow");
        await io.homePage.addStep(
            "*** Verified  that the ‘Test connection’ button UI is displayed properly while installing integation. ****"
        );

        //IO-T37327 Verify that the ‘Test connection’ button UI is displayed properly while cloning flow.
        //Clone flow
        await io.homePage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("Clone flow");
        await io.flowBuilder.click(selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION);
        await io.flowBuilder.selectTextfromDropDown(page, "none");
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
        await io.flowBuilder.loadingTime();

        //Disabled button
        const margin2 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin2, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RDBMS_HOST_INPUT, "Test");
        const margin3 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin3, "Test connection button not moved");
        await io.flowBuilder.loadingTime();

        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.homePage.clickByTextByIndex("POSTGRESQL CONNECTION", 1);
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.homePage.addStep(
            "*** Verified user should be able to clone the flow with NSAW imports with `Use optimized bulk load` option selected ****"
        );

        await io.marketplacePage.fill(selectors.mappings.MAPPER2DOT0PO.SEARCH_INPUT, "Clone - IO-T37326_Flow");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByTextByIndex("Clone - IO-T37326_Flow", 0);
        await io.assert.verifyElementDisplayedByText("Clone - IO-T37326_Flow", "Flow is not clonned successfully");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.deleteFlow();
    });
});