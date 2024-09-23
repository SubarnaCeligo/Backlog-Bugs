import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T31950 - Verify the new section should only be shown in the UI when the user selects 'export records from source application' under 'What would you like to export?' while creating a new export.", () => {
  test("@Zephyr-IO-T31950 @Env-All @Epic-IO-35739 @Priority-P2 - Verify the new section should only be shown in the UI when the user selects 'export records from source application' under 'What would you like to export?' while creating a new export.", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_API_TYPE)).not.toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_PURGE_JOB_AFTER_EXPORT)).not.toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS)).not.toBeVisible();

    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Salesforce');
    await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_API_TYPE)).not.toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_PURGE_JOB_AFTER_EXPORT)).not.toBeVisible();
    expect(await page.locator(selectors.exportsPagePO.SALESFORCE_BULK_MAX_RECORDS)).not.toBeVisible();
  });

});