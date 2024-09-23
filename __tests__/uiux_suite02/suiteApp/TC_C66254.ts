import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C66254 @Bug-IO-34856 @Priority-P1 @Zephyr-IO-T23465 `, () => {
  test(`@Env-All @Zephyr-IO-T23464 C66254`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'Netsuite');
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.REALTIME);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await page.keyboard.type('NETSUITE 347 CONNECTION');
    await io.flowBuilder.clickByText('NETSUITE 347 CONNECTION');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.ADVANCED);
    await io.homePage.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.SUITEAPP2, 'Suite App SuiteScript 2.0 is not displayed');
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE);
    await page.keyboard.type('customer');
    await io.flowBuilder.clickByText('Customer');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RULE_FILTER);
    await page.keyboard.type('Skip Export To Salesforce');
    await page.keyboard.press('Enter');
    await io.flowBuilder.clickByText('Yes');
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE, 1);
    await io.assert.verifyElementAttribute(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER_NAME, 'value', '["custentity_celigo_sfio_skip_export_to_sf","=",true]');
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('No');
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE, 1);
    await io.assert.verifyElementAttribute(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER_NAME, 'value', '["custentity_celigo_sfio_skip_export_to_sf","=",false]');

    // C66253 Verify that check box field under Field specific qualification criteria section of Real Time NS export shows T/F for Suite Bundle and Suite App 1.0
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SUITEBUNDLE);
    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RULE_FILTER);
    await page.keyboard.type('Skip Export To Salesforce');
    await page.keyboard.press('Enter');
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE, 1);
    await io.assert.verifyElementAttribute(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER_NAME, 'value', '["custentity_celigo_sfio_skip_export_to_sf","=","T"]');

    await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DROP_DOWN);
    await page.keyboard.type('No');
    await page.keyboard.press('Enter');
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE, 1);
    await io.assert.verifyElementAttribute(selectors.importPagePO.NETSUITE_DISTRIBUTED_QUALIFIER_NAME, 'value', '["custentity_celigo_sfio_skip_export_to_sf","=","F"]');
  });
});
