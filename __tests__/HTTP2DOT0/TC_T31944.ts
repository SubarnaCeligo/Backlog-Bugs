import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Support bulk API cases", () => {
  test("@Zephyr-IO-T31944 @Zephyr-IO-T31945 @Zephyr-IO-T31946 @Zephyr-IO-T31947 @Zephyr-IO-T31948 @Zephyr-IO-T31949 @Zephyr-IO-T31951 @Zephyr-IO-T31952 @Zephyr-IO-T31953 @Zephyr-IO-T31954 @Zephyr-IO-T31961 @Zephyr-IO-T31962 @Epic-IO-35739 @Priority-P2 @Env-All Support bulk API cases", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SALESFORCE');
    await io.flowBuilder.clickByText('SALESFORCE');
    await io.flowBuilder.fill(selectors.importPagePO.NAME, 'Test export');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.connectionPage.addStep("Creating Salesforce export");
    await io.homePage.loadingTime();
    // T31944 - Verify if user is able to view new options in salesforce API type in salesforce exports
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_API_TYPE)).toBeVisible();
    await io.connectionPage.addStep("Verifying the new options in salesforce API type in salesforce exports");

    // T31945 - Verify the default value in Salesforce API type options
    await io.assert.checkElementState(selectors.exportsPagePO.SALESFORCE_API_TYPE_REST_RADIO, 'isChecked');
    await io.connectionPage.addStep("Verifying the default value in Salesforce API type options");

    // T31946 - Verify helptext for Salesforce API type option in salesforce exports
    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_HELP_TEXT_ICON); 

    let value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    let expectedvalue = "Choose the API type. Choose the REST API to export one record at a time. Choose Bulk API 2.0 to export many records asynchronously. Bulk API 2.0 only allows the All, limit, and Delta options."
    let func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the helptext for Salesforce API type option in salesforce exports");

    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_BULK_RADIO);
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);

    // T31947 - Verify if a new checkbox field added when user choose ‘Bulk API 2.0' in salesforce API type in Salesforece exports
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS)).toBeVisible();

    await expect(page.locator(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS)).toHaveAttribute('value', 'false');
    await io.connectionPage.addStep("Verifying the new checkbox field added when user choose ‘Bulk API 2.0' in salesforce API type in Salesforece exports");

    // T31948 - Verify helptext for checkbox field Field name: Include archived and deleted records
    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS_HELP_TEXT_ICON);
    value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    expectedvalue = "Check this to include archived and deleted records in your query results."
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the helptext for checkbox field Field name: Include archived and deleted records");

    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);

    // T31949 - Verify export type options when Bulk API 2.0 is selected
    expect(await page.locator(selectors.exportsPagePO.EXPORT_TYPE_ALL)).toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.EXPORT_TYPE_INCREMENTAL)).toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.EXPORT_TYPE_DELTA)).toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.EXPORT_TYPE_FULL)).not.toBeVisible();
    await io.connectionPage.addStep("Verifying the export type options when Bulk API 2.0 is selected");

    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_ALL);

    // T31951 - Verify a new field ‘Maximum records per request’ should be added under ‘Advanced’ section of the export
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS)).toBeVisible();
    await io.connectionPage.addStep("Verifying the new field 'Maximum records per request' should be added under 'Advanced' section of the export");

    // T31953 - Verify the field ‘Maximum records per request’ should be a number field. User can only enter numbers here
    await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS_INPUT, 'random text');
    await io.assert.verifyElementContainsText(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS,'Only numbers allowed');
    await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS_INPUT, 100000000);
    await io.connectionPage.addStep("Verifying the field 'Maximum records per request' should be a number field. User can only enter numbers here");

    // T31952 - Verify the help text for field ‘Maximum records per request’
    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS_HELP_TEXT_ICON);
    value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    expectedvalue = "Enter the maximum number of records to retrieve for each set of query results. The request is subject to size limits, and returns data based on your service type. Use this field to reduce the maximum number of records per request if you receive timeout errors."
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the help text for field 'Maximum records per request'");

    // T31954 - Verify all the above changes should be applicable only for SF exports and only when user selects Bulk API 2.0
    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_REST_RADIO);
    expect(await page.locator('[id="salesforce.bulkMaxRecords"]')).not.toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_INCLUDE_AND_ARCHIVED_RECORDS)).toBeVisible();
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    expect(await page.locator(selectors.exportsPagePO.EXPORT_TYPE_FULL)).toBeVisible();
    await io.flowBuilder.click(selectors.exportsPagePO.EXPORT_TYPE_ALL);
    await io.connectionPage.addStep("Verifying all the above changes should be applicable only for SF exports and only when user selects Bulk API 2.0");

    // T31961 - verify the preview call once BULK api 2.0 is selected and max record per request value has been set
    // T31962 - Verify ‘Maximum records per request’ with a large value and preview the export ex:100000000
    await io.flowBuilder.click(selectors.exportsPagePO.SALESFORCE_API_TYPE_BULK_RADIO);

    await io.flowBuilder.fill(selectors.exportsPagePO.SALESFORCE_SOQL_QUERY, 'select Name from Account');
    await io.flowBuilder.click(selectors.importPagePO.CLICKPREVIEW);
    await io.connectionPage.addStep("Clicking on preview");

    value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.CONTENT)
    expectedvalue = "Preview is not supported for Salesforce Bulk API 2.0 exports at this time."
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match")
    await io.connectionPage.addStep("Verifying the preview call once BULK api 2.0 is selected and max record per request value has been set");
  });

});