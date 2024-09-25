import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106846", () => {
  test("C106846 Test to validate that user is able to see cursor at next argument after he selects an item from Helpers section(For ex:- if the user selects dateadd then ui should show {{dateadd | the cursor should be at the end as shown here @Zephyr-IO-T23884 @Env-All @Priority-P2", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.addStep("*** Navigated to Production Env ***");
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
    await io.flowBuilder.click(selectors.importPagePO.HTTP_RELATIVEURI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTPREQUSTBODY);

    await page.keyboard.type("{{");
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER,"Handlebars popper is not visible but it should be");

    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.POPPER_TAB_HELPERS);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.TREE_ITEM);
    await io.flowBuilder.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.TREE_ITEM,
      1
    );

    const textarea = await page.$(selectors.connectionsPagePO.RULE_TEXTAERA);

    // verify text is updated
    const text = await textarea.evaluate((element: HTMLTextAreaElement) => element.value);
    expect(text.trim()).toEqual("{{abs");

    // verify the cursor position is at the end i.e, cursor should point at the end of current argument
    const selectionRange = await textarea.evaluate(
      (element: HTMLTextAreaElement) => element.selectionStart
    );
    expect(selectionRange).toEqual(6);
  });
});
