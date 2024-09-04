import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C32141", () => {
  test("@Env-All @Zephyr-IO-T9686 TC_C32141", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime()
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Http');
    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, 'TC_C32141');
    await io.flowBuilder.click(selectors.exportsPagePO.HTTP_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.COMPOSITE_METHOD);
    await io.flowBuilder.click(selectors.exportsPagePO.COMPOSITE_DROPDOWN);
    await io.homePage.loadingTime()
    await io.assert.verifyElementContainsText(selectors.exportsPagePO.COMPOSITEDROPDOWN_VALUES1, 'Create new records & ignore existing records');
    await io.assert.verifyElementContainsText(selectors.exportsPagePO.COMPOSITEDROPDOWN_VALUES2, 'Create new records & update existing records');
    await io.assert.verifyElementContainsText(selectors.exportsPagePO.COMPOSITEDROPDOWN_VALUES3, 'Ignore new records & update existing records');

  });

});