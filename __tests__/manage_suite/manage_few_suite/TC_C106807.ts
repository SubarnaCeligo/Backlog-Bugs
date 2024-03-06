import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106807", () => {
  test("C106807 C106827 Test to validate that the datatype is visible for the items in Fields section  in the access level accounts where ever it is applicable", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECT');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);

    // verify the popper is visible only when the user types {{
    await page.keyboard.type('{{');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars popper is not visible but it should be');

    // verify the field drop downs haviing the data type, we are checking the text for that
    await io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'connectionobject' ,1);
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM + ' button', 1);
    await io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'namestring' ,2);


    await io.flowBuilder.click('button[aria-controls="helpers"]');
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM);
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 1);

    const textarea = await page.$(selectors.connectionsPagePO.RULE_TEXTAERA);
    const text = await textarea.evaluate((element: HTMLTextAreaElement) => element.value);
    expect(text).toEqual('{{abs \n\n');

    // C106827 Test to validate that user is able to edit any field inside helper expression
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');

    const updatedTextarea = await page.$(selectors.connectionsPagePO.RULE_TEXTAERA);
    const updatedText = await updatedTextarea.evaluate((element: HTMLTextAreaElement) => element.value);
    await page.pause();
    expect(updatedText.trimEnd()).toEqual('{{a');
  });
});