import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Epic-IO-54540  @Priority-P2  @Zephyr-IO-T27537 @Env-All", () => {
    test("@Epic-IO-54540  @Priority-P2  @Zephyr-IO-T27537 @Env-All", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        // await io.flowBuilder.clickByText("Create from scratch")
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_SEARCH);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
        const label = await io.homePage.isVisible("text='Transfer files out of source application'")
        await io.assert.expectToBeTrue(label, "Field value not found");
    });
    test("@Epic-IO-54540  @Priority-P2  @Zephyr-IO-T28261 @Env-All", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'LOOP RETURN');
        await io.flowBuilder.click(selectors.connectionsPagePO.LOOP_RETURN_CONNECTION);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        const flowStep = await io.homePage.isVisible("text='Show more'")
        await io.assert.expectToBeFalse(flowStep, "Field value found");
        const marketplaceStep = await io.homePage.isVisible("text='Show more'")
        await io.assert.expectToBeFalse(marketplaceStep, "Field value found");
    });
    test("@Epic-IO-54540  @Priority-P2  @Zephyr-IO-T27514 @Env-IAQA", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByText("Look up additional records (per record)");
        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);
        // await io.flowBuilder.clickByText("Create from scratch")
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        const appCrash = await io.homePage.isVisible("text='Create lookup'")
        await io.assert.expectToBeTrue(appCrash, "Field value found");
    });
    test("@Epic-IO-54540  @Priority-P2  @Zephyr-IO-T28631 @Env-IAQA", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
        await io.flowBuilder.click(selectors.importPagePO.SALESFORCE_IMPORT);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.REALTIME_EXPORT_TYPE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES, 0);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.importsPage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.importsPage.clickByText('SALESFORCE CONNECTION');
        await io.flowBuilder.loadingTime();
        await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();
        const text = await io.homePage.isVisible("text='New flow'")
        await io.assert.expectToBeTrue(text, "Field value found");
    });
});