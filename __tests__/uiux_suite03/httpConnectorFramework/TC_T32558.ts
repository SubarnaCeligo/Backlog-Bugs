import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Snowflake Bulk Load epic testcases (IO-68704)", () => {
  test("@Zephyr-T32558 @Zephyr-T32559 @Zephyr-T32560 @Zephyr-T32561 @Zephyr-T32562 @Zephyr-T32563 @Zephyr-T32565 @Zephyr-T32566 @Zephyr-T32567 @Zephyr-T32568 @Zephyr-T32569 @Zephyr-T32570 @Zephyr-T32571 @Zephyr-T32574 @Zephyr-T32576 @Zephyr-T32581 @Zephyr-T32582 @Zephyr-T32587 @Zephyr-T32876 @Epic-IO-68704 @Priority-P2 @Env-All Snowflake bulk load epic cases", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Snowflake');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SNOWFLAKE);
    await io.homePage.click(selectors.flowBuilderPagePO.SNOWFLAKE);
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    await io.connectionPage.addStep("Creating Snowflake import");

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    // T32558 - Verify if user is able to view new options in Snowflake API type in Snowflake imports
    // T32559 - Verify the default value in Snowflake Query type options
    expect(await page.locator(selectors.importPagePO.BULK_LOAD_OPTION)).toBeVisible();
    await io.assert.checkElementState(selectors.importPagePO.BULK_LOAD_OPTION_INPUT, 'isChecked');
    await io.connectionPage.addStep("Verifying the default value in Snowflake Query type options");

    // T32560 - Verify The existing query type labeled "Use bulk insert SQL query (recommended)" should be relabeled to "Use batch insert SQL query"
    await io.assert.verifyElementDisplayedByText(
      "Use batch insert SQL query",
      "Use bulk insert SQL query (recommended)\" is not relabeled to \"Use batch insert SQL query\""
    );

    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'Test import');
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SNOWFLAKE');
    await io.flowBuilder.clickByText('SNOWFLAKE');

    await io.exportsPage.click(selectors.basePagePO.SAVE);
    await io.connectionPage.addStep("Verified The existing query type labeled \"Use bulk insert SQL query (recommended)\" should be relabeled to \"Use batch insert SQL query\"");

    // T32561 - Verify destination table is a required field and Primary key is an option field and user should be able to select from destination table
    // T32574 - For the bulk load option, Destination Table is mandatory, Primary Keys is optional. Need TC's against those validations.
    expect(await page.locator(selectors.importPagePO.DESTINATION_TABLE_RDBMS)).toBeVisible();
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.DESTINATION_TABLE_RDBMS_ERROR);
    const errorMsg = (await io.exportsPage.getText(selectors.importPagePO.DESTINATION_TABLE_RDBMS_ERROR)).toString();
    await io.assert.expectToContainValue('A value must be provided', errorMsg, "Error is not showing properly");
    await io.assert.verifyElementNotBeFound(selectors.importPagePO.PRIMARY_KEYS_RDBMS_ERROR);
    await io.connectionPage.addStep("Verified destination table is a required field and Primary key is an option field and user should be able to select from destination table");

    // T32562 - Verify When new query type is selected, then we should be able to see a new field "Primary key(s)"
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS)).toBeVisible();
    await io.connectionPage.addStep("Verified When new query type is selected, then we should be able to see a new field 'Primary key(s)'");

    // T32563 - Verify if the destination table has primary keys set, pre-populate the primary key field with those primary keys.
    // T32565 - Verify when user change the value in ‘Destination table’ either by selecting through dropdown or by typing some text then clicking outside
    await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_RDBMS_INPUT, 'CELIGOLABS_2.PUBLIC.RAWTABLE');
    await page.waitForTimeout(1000);
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    await page.waitForTimeout(1000);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).not.toBeVisible();

    await io.homePage.click(selectors.importPagePO.PRIMARY_KEYS_RDBMS_CLEARTEXT_BUTTON);
    await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_RDBMS_INPUT, 'CELIGOLABS_2.PUBLIC.STUDENTDEMO');
    await io.homePage.click(selectors.importPagePO.STUDENT_DEMO_DROPDOWN_OPTION);
    await page.waitForTimeout(1000);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).not.toBeVisible();
    await io.connectionPage.addStep("Verified if the destination table has primary keys set, pre-populate the primary key field with those primary keys");

    // T32566 - Verify when user click on the refresh icon of 'Primary keys,'
    await io.homePage.click(selectors.importPagePO.PRIMARY_KEYS_RDBMS_CLEARTEXT_BUTTON);
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await page.waitForTimeout(1000);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).toBeVisible();
    await io.connectionPage.addStep("Verified when user click on the refresh icon of 'Primary keys,'");

    // T32567 - Verify when user toggles between different Query types, like if they go from ‘Use optimized bulk load (recommended for larger imports))' to ‘Use SQL query once per record’ and then again come back to the new option( ‘Use optimized bulk load (recommended) for larger imports)’ then the primary key field should be pre-populated with the previous value
    await io.homePage.click(selectors.flowBuilderPagePO.BULKINSERTPOSTGRE);
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    await page.waitForTimeout(1000);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).toBeVisible();
    await io.connectionPage.addStep("Verified when user toggles between different Query types, like if they go from ‘Use optimized bulk load (recommended for larger imports))' to ‘Use SQL query once per record’ and then again come back to the new option( ‘Use optimized bulk load (recommended) for larger imports)’ then the primary key field should be pre-populated with the previous value");

    // T32568 - Verify while toggling, when user changes the Destination table and then moves to the new option
    await io.homePage.click(selectors.flowBuilderPagePO.BULKINSERTPOSTGRE);
    await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_RDBMS_INPUT, 'CELIGOLABS_2.PUBLIC.RAWTABLE');
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    await page.waitForTimeout(1000);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).not.toBeVisible();
    await io.connectionPage.addStep("Verified while toggling, when user changes the Destination table and then moves to the new option then primary will pre-populate");

    // T32569 - Verify when the user clears the destination table, then verify primary keys.
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLE_RDBMS_CLEARTEXT_BUTTON);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).toBeVisible();
    await io.connectionPage.addStep("Verified when the user clears the destination table the primary keys will be cleared too");

    // T32570 - Verify when the user writes a handlebar text in the ‘Destination table’ for the new query type ‘Use optimized bulk load (recommended for larger imports).
    await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_RDBMS_INPUT, '{{handlebarText}}');
    await page.waitForTimeout(1000);
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    await io.flowBuilder.fill(selectors.importPagePO.PRIMARY_KEYS_RDBMS_INPUT, 'randomText');
    await io.flowBuilder.clickByText('Add "randomText"');
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).not.toBeVisible();
    await io.connectionPage.addStep("Verified when the user writes a handlebar text in the ‘Destination table’ for the new query type ‘Use optimized bulk load (recommended for larger imports) then user can manually add primary keys");

    // T32571 - when user choose ‘Destination table’ values from dropdown , then verify if user is able to add primary keys manually
    await io.flowBuilder.fill(selectors.importPagePO.DESTINATION_TABLE_RDBMS_INPUT, 'CELIGOLABS_2.PUBLIC.RAWTABLE');
    await page.waitForTimeout(1000);
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    await page.waitForTimeout(1000);
    await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.REFRESH_RESOURCE);
    await io.homePage.click(selectors.importPagePO.PRIMARY_KEYS_RDBMS_CLEARTEXT_BUTTON);
    await io.exportsPage.waitForElementAttached(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER);
    await io.flowBuilder.fill(selectors.importPagePO.PRIMARY_KEYS_RDBMS_INPUT, 'randomText');
    await page.keyboard.press('Enter');
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    expect(await page.locator(selectors.importPagePO.PRIMARY_KEYS_RDBMS_PLACEHOLDER)).toBeVisible();
    await io.connectionPage.addStep("Verified when the user writes a handlebar text in the ‘Destination table’ for the new query type ‘Use optimized bulk load (recommended for larger imports) then user can manually add primary keys");

    // T32576 - Switching to other Query Type from Bulk Load, the dependent fields should also be changed. And vice-versa.
    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);
    await io.assert.verifyElementNotBeFound(selectors.importPagePO.PRIMARY_KEYS_RDBMS);
    await io.assert.verifyElementNotBeFound(selectors.importPagePO.DESTINATION_TABLE_RDBMS);
    await io.connectionPage.addStep("Verified Switching to other Query Type from Bulk Load, the dependent fields should also be changed. And vice-versa.");

    // T32581 - Verify help text for destination table
    await io.homePage.click(selectors.importPagePO.BULK_LOAD_OPTION);
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLE_RDBMS_HELP_TEXT_ICON);
    let value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    let expectedvalue = "Select a data destination for bulk inserts. You can bulk insert data into a table."
    let func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")

    // T32876 - Verify help text for primary key
    await io.homePage.click(selectors.importPagePO.PRIMARY_KEYS_RDBMS_HELP_TEXT_ICON);
    value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    expectedvalue = "Select one or more fields to designate as Primary Keys. These uniquely identify each record in your database."
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")

    // T32582 - Verify if refresh icon is added against the Destination table field so that the users can refresh and fetch the latest list of tables available.
    expect(await page.locator(selectors.flowBuilderPagePO.REFRESHBUTTONPOSTGRE)).toBeVisible();

    // T32587 - Verify if user is able to clear the table name via backspace or by clicking on 'x'
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLE_RDBMS_CLEARTEXT_BUTTON);
    await io.assert.verifyElementAttributeContainsText(
      selectors.importPagePO.DESTINATION_TABLE_RDBMS_INPUT,
      "value",
      ""
    );


  });

});