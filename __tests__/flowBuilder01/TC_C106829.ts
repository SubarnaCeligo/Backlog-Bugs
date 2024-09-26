import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106829 Test to validate that user is able to see helper syntax for nested expressions only when the cursor is pointing nested expression", () => {
  test("C106829 Test to validate that user is able to see helper syntax for nested expressions only when the cursor is pointing nested expression @Zephyr-IO-T23878 @Env-All @Priority-P2", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECT');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);

    // verify the popper is visible only when the user types {{
    await page.keyboard.type('{{');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars popper is not visible but it should be');

    // verify the popper is hidden only when the user types }} i.em the cursor is not nested inside the curly braces
    await page.keyboard.type('}}');
    await page.waitForTimeout(300);
    const handlebarsPopper = await page.$(selectors.basePagePO.HANDLEBAR_POPPER);
    expect(handlebarsPopper).toBeNull();

    // verify again the popper is visible when cursor is nested inside the curly braces
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars popper is not visible but it should be');
  });
});