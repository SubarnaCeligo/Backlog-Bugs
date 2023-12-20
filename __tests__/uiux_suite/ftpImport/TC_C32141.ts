import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C32141", () => {
  test("TC_C32141", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.clickByText('HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'TC_C32141');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click("[data-value='COMPOSITE']");
    await io.flowBuilder.click("[data-test='http.compositeType']");
    await io.assert.verifyElementContainsText("[data-value='createandignore']", 'Create new records & ignore existing records');
    await io.assert.verifyElementContainsText("[data-value='createandupdate']", 'Create new records & update existing records');
    await io.assert.verifyElementContainsText("[data-value='updateandignore']", 'Ignore new records & update existing records');

  });

});