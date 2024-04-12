import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119633 Verify the Celigo AI functionality working fine for Postgre SQL", () => {
  test("@Env-QA C119633 Verify the Celigo AI functionality working fine for Postgre SQL", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "PostgreSQL"
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.POSTGRESQL_APPLICATION
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Create from scratch");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "POSTGRESQL AI"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "POSTGRESQL CONNECTION"
    );
    await io.flowBuilder.clickByTextByIndex("POSTGRESQL CONNECTION", 0);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
      "Celigo AI is not displayed"
    )
    await io.flowBuilder.clickByTextByIndex('Celigo AI', 1);
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'Get the customer details');
    await io.flowBuilder.loadingTime();
    await page.keyboard.press('Enter');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR,
      "Celigo AI Prompt Thinking is not displayed"
    )
    await expect(
      page.locator(selectors.flowBuilderPagePO.OPENAI.PROMPT_QUERY).filter({ hasText: "SELECT *" })
    ).toBeVisible({ timeout: 30000 });
  });
});