import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C119207 Verify the Celigo AI Panel", () => {
  test("C119207 Verify the Celigo AI Panel", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText('Reset_DND');
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "Reset query is not displayed")
    const resetQuery = page.getByText('Reset query').first();
    await resetQuery.waitFor({ state: 'visible', timeout: 30000 });
    //C119208 C119206
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.OPENAI.RESET_TEMPLATE, "class", "Mui-disabled");
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.AICHATBOT_PANEL).last()).not.toBeVisible();
    await io.flowBuilder.clickByText('Celigo AI');
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.OPENAI.CELIGO_AI_FIELD,
      "Celigo AI Placeholder is not displayed"
    )
    await expect(page.locator(selectors.flowBuilderPagePO.OPENAI.AICHATBOT_PANEL).last()).toBeVisible();
  });
});