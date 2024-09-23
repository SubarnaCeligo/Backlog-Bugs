import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("UIUX Enhancements on CeligoAIBar", () => {
  test("@Env-All  @Zephyr-IO-T37949 @Zephyr-IO-T37950 @Zephyr-IO-T37951 ", async ({io, page}) => {

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('SalesforceDND');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(
      selectors.flowBuilderPagePO.SF_SOQL_QUERY,1 
    );
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.CELIGO_AI_BAR,"Celigo AI bar is not displayed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementDisplayedByText("How can I help you?","Text is not displayed");
    await io.flowBuilder.click(selectors.basePagePO.CELIGOAIFIELD);
    await io.assert.verifyElementAttributeContainsText(selectors.basePagePO.CELIGOAIFIELD,"placeholder","Tell me about your SOQL here... I will apply your request to the existing SOQL unless you tell me to replace it");
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'get account details from account table');
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.CELIGOAISENDBUTTON,"Send button is not displayed");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.CELIGOAISENDBUTTON);
    await io.assert.verifyElementIsDisplayed(
        selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
        "Celigo AI Prompt Thinking is not displayed"
      );
      await page.waitForTimeout(5000);
      await expect(
        page.locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY).filter({ hasText: "Select"||"SELECT" }).nth(0)
      ).toBeVisible({ timeout: 40000 });

      //Check previously sent prompt
      await io.flowBuilder.clickByText('get account details from account table');
      await io.assert.verifyElementDisplayedByText('get account details from account table','Previously sent prompts are not displayed');

      //verify the thumbs down icon is displayed

      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.THUMBSDOWN,"Element is not displayed");
      //verify reset conversation icon
      await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_CONVERSATION,"Element is not displayed");
      await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.RESET_CONVERSATION);
      const textSelector = 'text=get account details from account table';
      const isVisible = await page.isVisible(textSelector);
      expect(isVisible).toBeFalsy();
   
})
});