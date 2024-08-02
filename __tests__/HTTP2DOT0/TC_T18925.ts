import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify the help text for Simple/HTTP toggle", () => {
  test("@Zephyr-IO-T18925 @Env-All @Epic-IO-86262 @Priority-P2 - Verify the help text for Simple/HTTP toggle for lookups", async ({ io, page }) => {
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
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);

    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await page.locator(selectors.importPagePO.SIMPLE_HTTP_TOGGLE_HELP_TEXT).locator('nth=0').click();
    
    let value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP)
    let func1 = value.toString().includes("Simple form helps you to quickly configure the resources by displaying only the required minimum fields.");
    let func2 = value.toString().includes("HTTP form allows you to view and/or modify application specific resources at the universal HTTP connector level.");
    await io.assert.expectToBeTrue(func1 && func2, "help text doesn't match");

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, '3PL Central');
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.homePage.click(selectors.connectionsPagePO.THREEPL_CONNECTION);
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);


  });

});