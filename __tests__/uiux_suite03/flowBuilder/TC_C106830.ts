import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106830 Test to validate the auto suggestion feature in sandbox environment", () => {
  test("C106830 @Zephyr-IO-T23879 @Env-All @Priority-P2 Test to validate the auto suggestion feature in sandbox environment", async ({
    io,
    page
  }) => {
    // This also same as C106784: Test to validate the auto suggestion feature in sandbox environment
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.clickByTextByIndex('Create', 0);
    await io.homePage.clickByTextByIndex('Flow', 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "http");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "HTTP ZENDESK CONNECT"
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);

    await page.keyboard.type("{{");
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER,"Handlebars popper is not visible but it should be");

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.POPPER_TAB_HELPERS);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM);
    await io.flowBuilder.clickByIndex(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM, 1);

    const textarea = await page.$(selectors.connectionsPagePO.RULE_TEXTAERA);

    // verify text is updated
    const text = await textarea.evaluate((element: HTMLTextAreaElement) => element.value);
    expect(text.trim()).toEqual("{{abs");

    // verify the cursor position is at the end i.e, cursor should point at the end of current argument
    const selectionRange = await textarea.evaluate((element: HTMLTextAreaElement) => element.selectionStart);
    expect(selectionRange).toEqual(6);


    // C106447 Verify for handlebars AFE. numbering feature is available.
    // We verify the numbering feature by checking if the editor is Ace editor as it has line numbers
    await io.assert.verifyElementAttribute(selectors.connectionsPagePO.RULE_TEXTAERA, 'class', 'ace_text-input');
  });
});
