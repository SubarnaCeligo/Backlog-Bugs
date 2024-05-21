import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Epic-IO-35094 @Priority-P2 @Zephyr-IO-T4047 @Env-All C106831 Test to validate the auto suggestion feature in moniter account", () => {
  test("@Epic-IO-35094 @Priority-P2 @Zephyr-IO-T4047 @Env-All C106831 Test to validate the auto suggestion feature in moniter account", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECTION');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);

    // verify the popper is visible only when the user types {{
    await page.keyboard.type('{{');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars popper is not visible but it should be');

    // verify the popper is hidden only when the user types }} i.em the cursor is not nested inside the curly braces
    await page.keyboard.type('}}');
    await io.flowBuilder.loadingTime();
    const handlebarsPopper = await page.$(selectors.basePagePO.HANDLEBAR_POPPER);
    expect(handlebarsPopper).toBeNull();

    // verify again the popper is visible when cursor is nested inside the curly braces
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars popper is not visible but it should be');
  });
});