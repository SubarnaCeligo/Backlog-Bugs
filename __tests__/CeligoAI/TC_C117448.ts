import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C117448 Verify Filter is having Celigo AI", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T18803 C117448 Verify Filter is having Celigo AI", async ({ io, page }) => {
   
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Filter_DND');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    //EXPORT_FILTER 
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 0);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await page.waitForTimeout(1000);
 
    //Verify Celigo AI are in collapsed state and disabled.
    // await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR).nth(1)).toBeDisabled();
    // await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false", 1);
    
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
    //   "Celigo AI is not displayed"
    // );
    // await io.flowBuilder.loadingTime();
    // await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT);
    // await io.flowBuilder.loadingTime();
    // await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW,"data-popper-placement","top");
    // await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Provide instructions for Celigo AI to generate a Filter rules for you. ');
    // await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT_WINDOW, 'Note: Your instructions will not be saved after you exit the editor window.');
    // await io.flowBuilder.loadingTime();
    // await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.HELPTEXT_CLOSE, 0);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.flowBuilder.loadingTime();

    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,"placeholder","Tell me about your filter here... I will apply your request to the existing filter unless you tell me to replace it");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    //Verify Celigo AI are in expand state. Explain button disabled  C117472
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","true", 1);
    const explainDisabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainDisabled[0].getAttribute('class')).toContain('Mui-disabled');

    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION,'Explain filter rules')
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_FILTER_RULES, 0, false);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.RUNTEST_TOOLTIP, "Tooltip for explanation button is not displayed")

    //Default layout is vertical layout if Celigo AI is enabled for filter editors C117454
    await io.flowBuilder.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.playgroundPO.SELECTED_COLUMN_VIEW,
      "Default layout is not column view"
    );
    await io.flowBuilder.click(selectors.playgroundPO.SELECTED_COLUMN_VIEW);
    await io.flowBuilder.loadingTime();
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).focus();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await io.flowBuilder.loadingTime();
    await page.evaluate(() => {
      // @ts-ignore
      const editor = ace.edit("data"); 
      editor.setValue("");
    });
    await io.flowBuilder.loadingTime();
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).fill(`{
      "record": {
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones"
      },
      "settings": {
        "integration": {},
        "flow": {},
        "flowGrouping": {},
        "connection": {},
        "iClient": {},
        "export": {}
      }
    }`);

    // Invalid Prompt C117466
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Simply');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL);
    // await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT, 0);
    // const promptErrorMsg = page.locator(selectors.flowBuilderPagePO.OPENAI.ERROR_CODEPANEL).filter({ hasText: /^Invalid·prompt·-·Please·provide·relevant·prompt\.¶$/ }).nth(1)
    // await promptErrorMsg.waitFor({ state: 'visible', timeout: 30000 });
    // await io.flowBuilder.loadingTime();

    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).focus();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await io.flowBuilder.loadingTime();
    await page.evaluate(() => {
      // @ts-ignore
      const editor = ace.edit("data"); 
      editor.setValue("");
    });
    await io.flowBuilder.loadingTime();
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).fill(`{
      "record": {
        "id": 1,
        "title": "iPhone 9",
        "description": "An apple mobile which is nothing like apple",
        "price": 549,
        "discountPercentage": 12.96,
        "rating": 4.69,
        "stock": 94,
        "brand": "Apple",
        "category": "smartphones"
      },
      "settings": {
        "integration": {},
        "flow": {},
        "flowGrouping": {},
        "connection": {},
        "iClient": {},
        "export": {}
      }
    }`);

    //Valid Prompt for filter C117459
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Filter by price less than 500');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL, "FALSE:");
    // await expect(await page.locator(selectors.flowBuilderPagePO.AFE_RESULT_PANEL)).toContainText('FALSE:');

    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'remove previous filter and add following filters  i. brand is Apple ii. price is greater than 500 iii. category is smartphones');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await io.flowBuilder.loadingTime();
    const idResult = page.getByText('500').first();
    await idResult.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await expect(page.locator(selectors.flowBuilderPagePO.AFE_RESULT_PANEL)).toContainText('TRUE:');

    // remove filter rules with mouse clicks
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETECONDI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETECONDI);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETECONDI);
    await io.flowBuilder.loadingTime();

    // check for another filter with different data
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).focus();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A'); 
    await io.flowBuilder.loadingTime();
    await page.evaluate(() => {
      // @ts-ignore
      const editor = ace.edit("data"); 
      editor.setValue("");
    });
    await io.flowBuilder.loadingTime();
    (await page.$(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT)).fill(`{
      "record": {
        "transactionId": "TX123456789",
        "date": "2024-02-23",
        "amount": 150,
        "currency": "USD",
        "customer": {
          "customerId": "C12345",
          "name": "Jane Doe"
        },
        "item": {
          "itemId": "I123",
          "quantity": 1
        }
      },
      "settings": {
        "integration": {},
        "flow": {},
        "flowGrouping": {},
        "connection": {},
        "iClient": {},
        "export": {}
      }
    }`);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'filter by where item quantity is 2, amount is less than 160 and customerId is C12345');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL, "FALSE:");
    // await expect(page.locator(selectors.flowBuilderPagePO.AFE_RESULT_PANEL)).toContainText('FALSE:');

    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'update the filter with quantity to be 1 instead');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await expect(page.locator(selectors.flowBuilderPagePO.AFE_RESULT_PANEL)).toContainText('TRUE:');

    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'negate the current filter');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(selectors.flowBuilderPagePO.AFE_RESULT_PANEL, "FALSE:");
    // await expect(page.locator(selectors.flowBuilderPagePO.AFE_RESULT_PANEL)).toContainText('FALSE:');

    //C117473
    await io.flowBuilder.loadingTime();
    const explainEnabled = await page.$$(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    expect(await explainEnabled[0].getAttribute('class')).not.toContain('Mui-disabled');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.EXPLAIN_SELECTION);
    await io.flowBuilder.loadingTime();
    const explanation = page.getByText('Explanation');
    await explanation.waitFor({ state: 'visible', timeout: 30000 });
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

    //IMPORT_FILTER
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    
    //Verify Celigo AI are in collapsed state and disabled.
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR).nth(1)).toBeDisabled();
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false", 1);
    
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
    //   "Celigo AI is not displayed"
    // )
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    //PlayGround C117450
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Playground");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.hover(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.flowBuilder.waitForElementAttached(
      selectors.playgroundPO.HANDLEBARS_EDITOR
    );
    await io.flowBuilder.clickByText('Filter editor');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Simple JSON record');
    await io.flowBuilder.loadingTime();
    //Verify Celigo AI are in collapsed state. 
    await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_BAR,"aria-expanded","false", 1);
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
    //   "Celigo AI is not displayed"
    // )
  });
});