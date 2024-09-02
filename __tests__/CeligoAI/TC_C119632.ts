import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119632 Verify the Celigo AI functionality working fine for MySQL", () => {
  test("@Env-All @Zephyr-IO-T25488 C119632 Verify the Celigo AI functionality working fine for MySQL", async ({io, page}) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'MySQL');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MYSQL);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "MYSQL AI"
    );
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,
      "MYSQL CONNECTION"
    );
    await io.flowBuilder.clickByTextByIndex("MYSQL CONNECTION", 0);
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
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD, 'get customer details from customer table');
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