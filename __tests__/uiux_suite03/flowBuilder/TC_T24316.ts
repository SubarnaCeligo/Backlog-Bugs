
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("To verify that the edit and new icon are shifted inside the connections drop down in export/imports", () => {
  test("@Zephyr-IO-T24316 @Env-All @Epic-IO-86262 @Priority-P2 - To verify that the edit and new icon are shifted inside the connections drop down in export/imports", async ({ io, page }, testInfo) => {
    await io.connectionPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.TOOLS);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.FLOW_BUILDER);
    await io.homePage.loadingTime();
    await io.flowBuilder.addStep("Checking for imports"); 
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CLOSE_ICON);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_ICON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);

    await page
      .locator(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST)
      .first()
      .locator('li')
      .first()
      .hover();
    
    await io.flowBuilder.addStep("Hovering over connections dropdown list");

    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.EDIT_CONN,
      "Edit icon is not displayed properly"
    );
    
    // ADD_NEW_RESOURCE
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.ADD_NEW_RESOURCE,
      "Create connection is not displayed properly"
    );
    
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.NAME_HELP_TEXT);

    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CLOSE_ICON);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_ICON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);

    await page
      .locator(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST)
      .first()
      .locator('li')
      .first()
      .hover();
    
    await io.flowBuilder.addStep("Hovering over connections dropdown list");

    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.EDIT_CONN,
      "Edit icon is not displayed properly"
    );
    
    // ADD_NEW_RESOURCE
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.ADD_NEW_RESOURCE,
      "Create connection is not displayed properly"
    );
  });
});

