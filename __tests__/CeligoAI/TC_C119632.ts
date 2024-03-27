import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119632 Verify the Celigo AI functionality working fine for MySQL", () => {
  test("@Env-All C119632 Verify the Celigo AI functionality working fine for MySQL", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, "MySQL");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MYSQL);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "MYSQL CONNECTION"
    );
    await io.flowBuilder.clickByText("MYSQL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "MYSQL AI"
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
      "Get the customer details"
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
    ).toBeVisible({ timeout: 50000 });
  });
});
