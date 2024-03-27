import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C110489 Verify system generates the Big query after the user has provided the prompt", () => {
  test("@Env-All C110489 Verify system generates the Big query after the user has provided the prompt", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Google BigQuery"
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "BIGQUERY CONNECTION"
    );
    await io.flowBuilder.clickByText("BIGQUERY CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "Google BigQuery AI"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    );
    await io.flowBuilder.clickByText("Celigo AI");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    );
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Get the customer details from gptverse"
    );
    await io.flowBuilder.loadingTime();
    await page.keyboard.press("Enter");
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    );
    await expect(
      page
        .locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY)
        .filter({ hasText: "SELECT *" })
    ).toBeVisible({ timeout: 30000 });
  });
});