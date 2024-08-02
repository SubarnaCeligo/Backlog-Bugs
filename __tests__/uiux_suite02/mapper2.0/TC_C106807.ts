import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import inputJson from "@testData/manageSuite/C106801.json"

test.describe("C106807 Test to validate that the datatype is visible for the items in Fields section  in the access level accounts where ever it is applicable", () => {
  test("@Env-All @Zephyr-IO-T23859 @Zephyr-IO-T23876 @Zephyr-IO-T23831 @Zephyr-IO-T23852 @Zephyr-IO-T23858 C106807 C106827 C106773, C106799, C106806, C106785 Test to validate that the datatype is visible for the items in Fields section  in the access level accounts where ever it is applicable", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'http');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'HTTP ZENDESK CONNECT');
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);

    // verify the popper is visible only when the user types {{
    await page.keyboard.type('{{');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars popper is not visible but it should be');

    // verify the field drop downs haviing the data type, we are checking the text for that
    await io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'connectionobject' ,1);
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM + ' button', 1);
    await io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'namestring' ,2);


    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.POPPER_TAB_HELPERS);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM);
    // C106817 Test to validate that the user is getting the hover text whenever we hover on any item inside the helper
    await io.flowBuilder.hover(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 1);
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP, 'Returns the absolute value of a number.');
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
    expect(updatedText.trimEnd()).toEqual('{{a');


    // C106773, C106785 Test to validate that user is able to invoke dropdown by clicking (Cmnd/Ctrl+space) combination,
    // and validate that user is seeing ""All"", ""Fields"","" Helpers"" options, and user should be able to navigate through each section when dropdown is invoked

    // clear all existing text
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Control+Space');

    const popperTabs = await page.$$(selectors.mappings.MAPPER2DOT0PO.HANDLEBARS + " " + selectors.flowBuilderPagePO.TAB_LIST + ' button');
    const allButtonText = await popperTabs[0].evaluate((element: HTMLButtonElement) => element.textContent);
    const fieldsButtonText = await popperTabs[1].evaluate((element: HTMLButtonElement) => element.textContent);
    const helpersButtonText = await popperTabs[2].evaluate((element: HTMLButtonElement) => element.textContent);


    expect(allButtonText).toEqual('All');
    expect(fieldsButtonText).toEqual('Fields');
    expect(helpersButtonText).toEqual('Helpers');


    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.POPPER_TAB_HELPERS);
    io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'Numeric', 0);

    // C106799 Test to validate that user is able to see data type beside each item which is inside ""Fields"" section
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.POPPER_TAB_FIELDS);
    io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'connectionobject', 0);
    
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.POPPER_TAB_ALL);
    io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'Fields', 0);


    // C106801 Test to validate the data type shown for items is changing whenever we change their data type in input json
    //(For example:-if the user changes the datavalue in the input json from string to boolean, then boolean datatype should be replaced with the str
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await page.keyboard.press("Control+A");
    await page.keyboard.press("Meta+A");
    await page.keyboard.press('Backspace');
    await io.flowBuilder.fill(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE + " " + selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT, JSON.stringify(inputJson, null, 2));

    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await page.keyboard.type('{{');
    await page.keyboard.press('Control+Space');

    io.assert.verifyElementTextByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 'connectionboolean', 1);

  });
});