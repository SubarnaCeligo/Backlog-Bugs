import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify Path/Query parameters are not being shown before selecting connection for HTTP 2.0 connectors", () => {
    test("@Bug-IO-86320 @Env-QA @Priority-P2 @Zephyr-IO-T35133 Export", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        //Export
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Walmart');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WALMART);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'WALMART EXPORT');
        await io.flowBuilder.loadingTime();
        //Query parameters
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.clickByText('Feeds');
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('All feed statuses');
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.QUERY_PARAMETERS_ROW, "Query parameters is not displayed properly");

        //Path parameters
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('Feed item status');
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.PATH_FIELD_ID, "Query parameters is not displayed properly");
    });
    test("@Bug-IO-86320 @Env-QA @Priority-P2 @Zephyr-IO-T35133 Import", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        //Import
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Walmart');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.WALMART);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'WALMART EXPORT');
        await io.flowBuilder.loadingTime();

        //Query parameters
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.clickByText('Inventory');
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('Update inventory');
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.QUERY_PARAMETERS_ROW, "Query parameters is not displayed properly");

        //Path parameters
        await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
        await io.homePage.clickByText('Items');
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
        await io.homePage.clickByText('Retire an item');
        await io.flowBuilder.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.QUERY_LOOKUP, "Query parameters is not displayed properly");
    });
});