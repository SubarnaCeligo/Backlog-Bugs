import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T37757  Verify user is able to use celigo AI in SQL editor", () => {
  test("@Env-QA @StoryID-IO-90942 @Zephyr-IO-T37757  @Author-SubarnaGhatak Verify user is able to use celigo AI in SQL editor", async ({io, page}) => {

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('OracleDBTextToSQL_DND');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'get customer details from Customer table');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await page.waitForTimeout(5000);
    });
  test("@Env-QA @StoryID-IO-90942 @Zephyr-IO-T37758 @Author-SubarnaGhatak Verify the Celigo AI functionality working fine for lookups", async ({io, page}) => {

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('OracleDBTextToSQL_DND');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'get customer details from Customer table');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await page.waitForTimeout(5000);
   
  });
});