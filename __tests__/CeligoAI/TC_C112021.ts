
import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C112021 Verify Application Should Not Crashes Upon CeligoAI Prompt Closure", () => {
  test("@Env-All @Zephyr-IO-T25485 C112021 Verify Application Should Not Crashes Upon CeligoAI Prompt Closure", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Amazon Redshift');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.REDSHIFT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "Amazon Redshift AI"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "AMAZON REDSHIFT CONNECTION"
    );
    await io.flowBuilder.clickByTextByIndex("AMAZON REDSHIFT CONNECTION", 0);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR
    );
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_HELPTEXT,
    //   "Celigo AI is not displayed"
    // );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CELIGO_AI_BAR);
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
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.loadingTime();
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.PROGRESS_BAR)).toBeHidden({ timeout: 30000 });
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.FETCH_PREVIEW,
      "Fetch Preview is not displayed"
    )
  });
});