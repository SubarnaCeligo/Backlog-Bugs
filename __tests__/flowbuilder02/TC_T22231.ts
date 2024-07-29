import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T22231 - Verify in the Oracle DB export, Group data dropdown should have suggested list of fields only if records are returned in preview and no suggestions if no preview data is returned", () => {
  test("@Zephyr-IO-T22231 @Env-All @Epic-IO-35739 @Priority-P2 - Verify in the Oracle DB export, Group data dropdown should have suggested list of fields only if records are returned in preview and no suggestions if no preview data is returned", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);

    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Mysql');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MYSQL);
    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.ADVANCED);

    await page.locator(selectors.exportsPagePO.QUERY1).locator('textarea').fill('select * from Grouping_QA');

    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTION_INPUT,
      "MYSQL CONNECTION"
    );
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
    await io.flowBuilder.loadingTime();

    let value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX)
    let expectedvalue = "No options"
    let func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeFalse(func, "No options available");

    await page.locator(selectors.exportsPagePO.QUERY1).locator('textarea').fill('121');

    await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
    await io.flowBuilder.waitForElementAttached(selectors.importPagePO.PARSED_OUTPUT);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
    await io.flowBuilder.loadingTime();

    value = await io.flowBuilder.getText(selectors.flowBuilderPagePO.OPENAI.FLOWGROUP_CHECKBOX)
    expectedvalue = "No options"
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "Options available");
  });

});