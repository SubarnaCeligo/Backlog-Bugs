import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T32859  Verify user is able to use celigo AI in SQL editor for Azure Synapse Connector", () => {
  test("@Env-QA @StoryID-IO-82077 @Zephyr-IO-T32859 @Zephyr-IO-T32872 @Zephyr-IO-T32860 @Zephyr-IO-T32861 @Zephyr-IO-T32862 @Zephyr-IO-T32863 @Author-SubarnaGhatak Verify user is able to use celigo AI in SQL editor for Azure Synapse Connector", async ({io, page}) => {

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('AzureSynapse_DND');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
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
    await expect(
      page.locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY).filter({ hasText: "SELECT *" }).nth(0)
    ).toBeVisible({ timeout: 40000 });
  });
  test("@Env-QA @StoryID-IO-82077 @Zephyr-IO-T32874 @Author-SubarnaGhatak Verify the Celigo AI functionality working fine for Dynamic lookup", async ({io, page}) => {

    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('AzureSynapse_DND');
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
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
    await expect(
      page.locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY).filter({ hasText: "SELECT *" }).nth(0)
    ).toBeVisible({ timeout: 40000 });
  });
});