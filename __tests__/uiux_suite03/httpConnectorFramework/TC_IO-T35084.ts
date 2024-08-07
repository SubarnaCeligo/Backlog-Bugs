import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/HTTP2DOT0/TC_IO-T35081.json";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T35102 @Zephyr-IO-T35100 @Zephyr-IO-T35084 @Zephyr-IO-T35085 @Zephyr-IO-T35102 @Zephyr-IO-T35081'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-76800 @Priority-P2 @Env-All @Zephyr-IO-T35102 @Zephyr-IO-T35100 @Zephyr-IO-T35084 @Zephyr-IO-T35085 @Zephyr-IO-T35102'", async ({ io, page }) => {
        await io.homePage.goToMenu("Tools", "Flow builder");
        await io.flowBuilder.loadingTime();

        //ADD IMPORT
        await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'NSAW');
        await io.flowBuilder.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.myAccountPage.clickByText("Import records into destination application");
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.loadingTime();
        await io.importsPage.fill(selectors.importPagePO.NAME_INPUT, "NSAW IMPORT");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE ANALYTICS WAREHOUSE CONNECTION');
        await io.flowBuilder.clickByText("NETSUITE ANALYTICS WAREHOUSE CONNECTION");
        await io.flowBuilder.loadingTime();


        //IO-T35102 Verify the message when no search results found
        await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT, "RandomTest");
        const helpText = await io.flowBuilder.isVisible('text="Your search didn’t return any matching results. Enter the name of an existing table."');
        await io.assert.expectToBeTrue(helpText, "Message text is not displayed.");
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);


        //IO-T35100 Verify the table names retrieved should be in ‘schema.tablename’ format
        await io.flowBuilder.click(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.flowBuilder.clearTextValue(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.signInPage.clickByText('ALLDATATYPES3');
        await io.flowBuilder.loadingTime();
        var dropDown = await page.locator(selectors.importPagePO.DESTINATION_TABLE_INPUT).getAttribute('value');;
        await io.assert.expectToBeValue("ADMIN.ALLDATATYPES3", dropDown.toString(), "dropDown is not displayed.");


        //IO-T35084 Verify when user toggles between different Query types, like if they go from ‘Use optimized bulk load (recommended for larger imports))' to ‘Use SQL query once per record’ and then again come back to the new option( ‘Use optimized bulk load (recommended
        await io.flowBuilder.click(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER);
        await io.signInPage.clickByText('MYDATE');
        await io.signInPage.clickByText('MYFLOAT');
        await io.signInPage.clickByText('MYINTEGER');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.MYINTEGER);
        await io.flowBuilder.click(selectors.importPagePO.MARIADB_PER_RECORD);
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        const myDate = await io.flowBuilder.isVisible('text="MYDATE"');
        await io.assert.expectToBeTrue(myDate, "MYDATE primary key is not displayed.");
        const myFloat = await io.flowBuilder.isVisible('text="MYFLOAT"');
        await io.assert.expectToBeTrue(myFloat, "MYFLOAT primary key is not displayed.");
        await io.connectionPage.addStep("**** Verified we will NOT pre-populate the ‘Primary keys’ with primary keys set of the destination table  ****");

        //IO-T35085 Verify while toggling, when user changes the Destination table and then moves to the new option
        await io.flowBuilder.click(selectors.importPagePO.MARIADB_INSERT_BULK);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.flowBuilder.clearTextValue(selectors.importPagePO.DESTINATION_TABLE_INPUT)
        await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT, "HISTORY");
        await io.signInPage.clickByTextByIndex('APEX$ARCHIVE_HISTORY', 0);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
        const id = await io.flowBuilder.isVisible('text="ID"');
        await io.assert.expectToBeTrue(id, "ID primary key is not displayed.");

    });
    test('@Epic-IO-76800 @Zephyr-IO-T35081 @Priority-P2 @Env-All Verify if Mappings should be supported for new query type "Use optimized bulk load (recommended for larger imports)"', async ({ io, page }) => {
        //IO-T35081 Verify if Mappings should be supported for new query type "Use optimized bulk load (recommended for larger imports)"
        await io.createResourceFromAPI(testData, "FLOWS");
        await io.homePage.loadingTime();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.IMPORT);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
        expect(await page.locator(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)).toBeVisible();
      });
});