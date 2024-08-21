import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Connections/Create/T37309.json";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T37309 @Zephyr-IO-T37316'", () => {
    let id;
    test.afterEach(async ({ io, page }) => {
        await io.api.deleteFlowViaAPI(id);
    });
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37309 @Zephyr-IO-T37311 @Zephyr-IO-T37312 @Zephyr-IO-T37313 @Zephyr-IO-T37320'", async ({ io, page, context }) => {
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'MYSQL');
        await io.connectionPage.click(selectors.flowBuilderPagePO.MYSQL);
        await io.flowBuilder.loadingTime();

        //IO-T37320 Verify that the ‘Test connection’ button UI is displayed properly when the ‘Save & Close’ button is not enabled from create connection page
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin11 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin11, "Test connection button not moved");
        await io.importsPage.fill(selectors.importPagePO.NAME_INPUT, "MYSQL CONNECTION");

        //IO-T37309 Verify Moved the "Test connection" button from left to next to the "Close" button on Create connection page
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");

        //IO-T37313 Verify Divider is showing between 'Test connection' and 'Close' button
        await io.assert.expectToBeTrue(await (await page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2).isVisible()), "Divider is not visible");


        //IO-T37312 Verify Mandatory Fields Validation
        await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
        await io.flowBuilder.loadingTime();
        const value = (await io.homePage.getText(selectors.flowBuilderPagePO.RDBMS_HOST)).toString();
        await io.assert.expectToContainValue(value, "A value must be provided", "Error not displayed");
        const value1 = (await io.homePage.getText(selectors.flowBuilderPagePO.RDBS_DATABASE)).toString();
        await io.assert.expectToContainValue(value1, "A value must be provided", "Error not displayed");
        const value2 = (await io.homePage.getText(selectors.flowBuilderPagePO.RDBMS_USER)).toString();
        await io.assert.expectToContainValue(value2, "A value must be provided", "Error not displayed");
        const value3 = (await io.homePage.getText(selectors.flowBuilderPagePO.RDBMS_PASSWORD)).toString();
        await io.assert.expectToContainValue(value3, "A value must be provided", "Error not displayed");

        //IO-T37311 Verify the 'Save', 'Close', 'Save & close' & 'Test connection' Button Functionality
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RDBMS_HOST_INPUT, "Test");
        await io.flowBuilder.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_DB, "Test");
        await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_USER, "Test");
        await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_PASSWORD, "Test");
        await io.flowBuilder.loadingTime();
        await io.connectionPage.click(selectors.basePagePO.SAVE);
        await page.getByText("Testing your connection...").waitFor({ state: "hidden", timeout:360000 });
        const text = await io.flowBuilder.isVisible('text="Confirm save"');
        await io.assert.expectToBeValue(text.toString(), "true", "Confirm save is not displayed");
        await io.connectionPage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
        await io.flowBuilder.loadingTime();
        await io.connectionPage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
        await page.getByText("Testing your connection...").waitFor({ state: "hidden", timeout:360000 });
        const text1 = await io.flowBuilder.isVisible('text="Confirm save"');
        await io.assert.expectToBeValue(text1.toString(), "true", "Confirm save is not displayed");
        await io.connectionPage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37316 @Zephyr-IO-T37317 @Zephyr-IO-T37318 @Zephyr-IO-T37319", async ({ io, page }) => {
        id = await io.createResourceFromAPI(TC, "FLOWS");
        await io.flowBuilder.loadingTime();

        //IO-T37316 Verify "Test connection" button moved next to "Close" button on Create connection page from Export/Import/Lookup page
        //IO-T37317 Verify "Test connection" button moved next to "Close" button on Edit connection page from Export/Import/Lookup page
        //IO-T37318 Verify that the ‘Test connection’ button UI is displayed properly when the ‘Save & Close’ button is not enabled from Export/Import/Lookup page
        //IO-T37319 Verify that the ‘Test connection’ button UI is displayed properly when the ‘Save & Close’ button is not enabled from Export/Import/Lookup page
        //Transfer
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);

        //Create connection
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        //Disabled button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).last();
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.ACCESS_KEY_ID, "Test");
        await io.flowBuilder.loadingTime();
        const marginDis = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", marginDis, "Test connection button not moved");
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();

        //Edit connection
        await io.flowBuilder.click(selectors.integrationPagePO.EDITRESOURCE);
        //Disabled button
        const editmargin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", editmargin, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.ACCESS_KEY_ID, "Test");
        const editmarginDis = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", editmarginDis, "Test connection button not moved");
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.loadingTime();


        //Lookup
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
        //Create connection
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        //Disabled button
        const marginDis1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", marginDis1, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.ACCESS_KEY_ID, "Test");
        await io.flowBuilder.loadingTime();
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");

        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();

        //Edit connection
        await io.flowBuilder.click(selectors.integrationPagePO.EDITRESOURCE);
        //Disabled button
        const editmargin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", editmargin1, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.ACCESS_KEY_ID, "Test");
        const editmarginEN1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", editmarginEN1, "Test connection button not moved");
        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.loadingTime();


        //IMPORT
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.TRANSFER, 2);
        //Create connection
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        //Disabled button
        const marginDis2 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", marginDis2, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.ACCESS_KEY_ID, "Test");
        await io.flowBuilder.loadingTime();
        const margin2 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin2, "Test connection button not moved");

        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();

        //Edit connection
        await io.flowBuilder.click(selectors.integrationPagePO.EDITRESOURCE);
        //Disabled button
        const editmargin2 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", editmargin2, "Test connection button not moved");

        //Enabled button
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.ACCESS_KEY_ID, "Test");
        await io.flowBuilder.loadingTime();
        const editmarginEn2 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", editmarginEn2, "Test connection button not moved");

        await io.flowBuilder.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-90427 @Priority-P2 @Env-QA @Zephyr-IO-T37323'", async ({ io, page, context }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.addStep("*** Navigated to Sandbox Env ***");
        await io.flowBuilder.loadingTime();
        //IO-T37323 Verify that the ‘Test connection’ button UI is displayed properly in sandbox.
        await io.homePage.goToMenu("Resources", "Connections");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'MYSQL');
        await io.connectionPage.click(selectors.flowBuilderPagePO.MYSQL);
        await io.flowBuilder.loadingTime();

        //Disabled button
        const element = page.locator(selectors.flowBuilderPagePO.DIVIDER).nth(2);
        const margin = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin, "Test connection button not moved");
        await io.flowBuilder.loadingTime();
        await io.importsPage.fill(selectors.importPagePO.NAME_INPUT, "MYSQL CONNECTION");

        // Enabled button
        const margin1 = await element.evaluate(el => {
            return window.getComputedStyle(el).margin;
        });
        await io.assert.expectToBeValue("0px 24px 0px 16px", margin1, "Test connection button not moved");
        await io.homePage.addStep("*** Verified The “Test connection” button should be moved from the left to next to the “Close” button and should be properly aligned in both the enabled and disabled states. ***");

        await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
        await io.homePage.addStep("*** Navigated to Production Env ***");

    });
});