import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117448 Verify Filter is having Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C117448 Verify Filter is having Celigo AI", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('Filter_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //EXPORT_FILTER 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    //Verify Celigo AI are in collapsed state and disabled.
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false");
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-disabled","true");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT);
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,"data-popper-placement","top");
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Provide instructions for Celigo AI to generate a Filter rules for you. ');
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Note: Your instructions will not be saved after you exit the editor window.');
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HELPTEXT_CLOSE, 0);
    await io.flowBuilder.clickByText('Celigo AI');
    const placeholderText = page.getByText('Start typing a prompt that describes the filter rules.The conversation will be recorded here for as long as you remain in this screen.').first();
    await placeholderText.waitFor({ state: 'visible', timeout: 30000 });
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //Verify Celigo AI are in expand state. Explain button disabled  C117472
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","true");
    const explainDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainDisabled[0].getAttribute('class')).toContain('Mui-disabled');

    //Default layout is vertical layout if Celigo AI is enabled for filter editors C117454
    await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    await io.assert.verifyElementIsDisplayed(
      selectors.playgroundPO.SELECTED_COLUMN_VIEW,
      "Default layout is not column view"
    );
    await io.flowBuilder.click(selectors.playgroundPO.SELECTED_COLUMN_VIEW);

    // Invalid Prompt C117466
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Simply');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    const promptErrorMsg = page.getByText('Invalid prompt - Please provide relevant prompt.').first();
    await promptErrorMsg.waitFor({ state: 'visible', timeout: 30000 });

    //Valid Prompt for filter C117459
    await io.flowBuilder.clickByText('Celigo AI');
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Add filter for id with value 123455929');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await io.flowBuilder.loadingTime();
    const idResult = page.getByText('123455929').first();
    await idResult.waitFor({ state: 'visible', timeout: 30000 });
    //C117473
    await io.flowBuilder.loadingTime();
    const explainEnabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainEnabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    await io.flowBuilder.loadingTime();
    const explanation = page.getByText('Explanation');
    await explanation.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ClOSE_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    //IMPORT_FILTER
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    //Verify Celigo AI are in collapsed state and disabled.
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false");
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-disabled","true");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //PlayGround C117450
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Playground");
    await io.flowBuilder.waitForElementAttached(
      selectors.playgroundPO.HANDLEBARS_EDITOR
    );
    await io.flowBuilder.clickByText('Filter editor');
    await io.flowBuilder.clickByText('Simple JSON record');
    //Verify Celigo AI are in collapsed state. 
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
  });
});