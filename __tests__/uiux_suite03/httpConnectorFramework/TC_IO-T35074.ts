import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar @Zephyr-IO-T35074 @Zephyr-IO-T35075 @Zephyr-IO-T35076 @Zephyr-T35077 @Zephyr-T35078 @Zephyr-T35079 @Zephyr-T35080 @Zephyr-T35082 @Zephyr-T35091 @Zephyr-T35098'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-76800 @Priority-P2 @Env-QA @Zephyr-IO-T35074  @Zephyr-IO-T35075 @Zephyr-IO-T35076 @Zephyr-T35077 @Zephyr-T35078 @Zephyr-T35079 @Zephyr-T35080 @Zephyr-T35082 @Zephyr-T35091 @Zephyr-T35098'", async ({ io, page }) => {
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

        //IO-T35074 Verify NSAW import should have a new query type "Use optimized bulk load (recommended for larger imports)" inside "Choose type" section
        //IO-T35075 Verify if Default value of "Choose type" would be newly added query type i.e., "Use optimized bulk load (recommended for larger imports)"
        await io.assert.verifyElementIsDisplayed(
            selectors.importPagePO.BULK_LOAD_OPTION,
            "Disabled error message is not displayed"
        );
        await io.assert.checkElementState(selectors.importPagePO.BULK_LOAD_OPTION_INPUT, 'isChecked');
        await io.connectionPage.addStep("Verifying the default value in Snowflake Query type options");

        //IO-T35076 Verify The existing query type labeled "Use bulk insert SQL query (recommended)" should be relabeled to "Use batch insert SQL query"
        await io.assert.verifyElementDisplayedByText(
            "Use batch insert SQL query",
            "'Use bulk insert SQL query (recommended)' is not relabeled to 'Use batch insert SQL query'"
        );
        const isDisplayed = await io.flowBuilder.isVisible('text="Use bulk insert SQL query (recommended)"');
        await io.assert.expectToBeFalse(isDisplayed, "Use bulk insert SQL query (recommended) id displayed.");

        //IO-T35078 Verify When new query type is selected, then we should be able to see a new field "Primary key(s)"
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.PRIMARY_KEY, "Primary Key id not displayed.");
        const primaryKey = await io.flowBuilder.isVisible('text="Primary keys"');
        await io.assert.expectToBeTrue(primaryKey, "Primary Key id not displayed.");

        //IO-T35098 Verify the help text for Destination table field
        await io.flowBuilder.click('[id="jdbc.bulkInsert.tableName"] [data-test="help-text-icon"]');
        const helpText1 = await io.flowBuilder.isVisible('text="Select a data destination for bulk inserts. You can bulk insert data into a table."');
        await io.assert.expectToBeTrue(helpText1, "Help text id not displayed.");
        await io.flowBuilder.click('[id="jdbc.bulkInsert.tableName"] [data-test="help-text-icon"]');


        //IO-T35079 Verify help text for primary key
        await io.flowBuilder.click(selectors.importPagePO.PRIMARY_KEY_HELP_ICON);
        const helpText = await io.flowBuilder.isVisible('text="Select one or more fields to designate as Primary Keys. These uniquely identify each record in your database."');
        await io.assert.expectToBeTrue(helpText, "Help text id not displayed.");
        await io.flowBuilder.click(selectors.importPagePO.PRIMARY_KEY_HELP_ICON);


        //IO-T35077 Verify When the new query type is selected, users should be able to select their "Destination table" via the drop down list (the same field that exists for the existing “Use bulk insert SQL query (recommended)” option). This field should be a required field.
        //IO-T35091 For the bulk load option, Destination Table is mandatory, Destination Table is mandatory. Need TC's against those validations.
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        //Destination Table is mandatory
        const errorMsg = await io.flowBuilder.isVisible('text="A value must be provided"');
        await io.assert.expectToBeTrue(errorMsg, "Error message is not displayed.");
        //Destination Table is mandatory
        await io.assert.verifyElementNotBeFound(selectors.importPagePO.PRIMARY_KEY_ERROR);

        //users should be able to select their "Destination table" via the drop down list (the same field that exists for the existing “Use bulk insert SQL query (recommended)” option).
        await io.flowBuilder.click(selectors.importPagePO.DESTINATION_TABLE_INPUT);
        await io.signInPage.clickByText('ALLDATATYPES3');
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.importPagePO.MARIADB_INSERT_BULK);
        var dropDown = await page.locator(selectors.importPagePO.DESTINATION_TABLE_INPUT).getAttribute('value');;
        await io.assert.expectToBeValue("ADMIN.ALLDATATYPES3", dropDown.toString(), "dropDown is not displayed.");
        await io.flowBuilder.click(selectors.importPagePO.BULK_LOAD_OPTION_INPUT);


        //IO-T35082 Verify when user change the value in ‘Destination table’ either by selecting through dropdown or by typing some text then clicking outside
        //IO-T35080 Verify if the destination table has primary keys set, pre-populate the primary key field with those primary keys.
        await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_INPUT,"HISTORY");
        await io.signInPage.clickByTextByIndex('APEX$ARCHIVE_HISTORY',0);
        await io.flowBuilder.loadingTime();
        const prePopulate = await io.flowBuilder.isVisible('text="ID"');
        await io.assert.expectToBeTrue(prePopulate, "Pre-populate the primary key is not displayed.");
        expect(await page.locator(selectors.importPagePO.PRIMARY_KEY_PLACEHOLDER)).not.toBeVisible();
    });
});