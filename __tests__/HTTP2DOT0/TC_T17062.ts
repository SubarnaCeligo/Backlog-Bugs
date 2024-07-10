import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the help text for update and create endpoints", () => {
  test("@Zephyr-IO-T17062 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the help text for update and create endpoints", async ({ io, page }) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, '3PL Central');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.flowBuilder.clickByText("Customers");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.clickByText("Composite: create new records & update existing records");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.clickByText("Create a customer");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.flowBuilder.clickByText("Billing");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await io.flowBuilder.clickByText("Customers");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.click(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await io.flowBuilder.clickByText("Composite: create new records & update existing records");

    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);

    await io.flowBuilder.click(selectors.importPagePO.CREATE_ENDPOINTS_HELP_TEXT_ICON);

    let value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    let expectedvalue = "API endpoint for create new records - Select the API endpoint that should be used for creating new records. For more information, see"
    let func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match");

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.flowBuilder.click(selectors.importPagePO.UPDATE_ENDPOINTS_HELP_TEXT_ICON);

    value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    expectedvalue = "API endpoint for update existing records - Select the API endpoint that should be used for updating existing records. For more information, see"
    func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match");


  });

});