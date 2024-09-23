import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T860 To verify  Adding the New ReadMe", () => { 
  test("@Env-All @Zephyr-IO-T860 Verify Adding the New ReadMe", async ({io, page}) => {
  await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
  await io.integrationPage.click(selectors.integrationPagePO.ADMINTAB);
  await io.integrationPage.click(selectors.flowBuilderPagePO.README);
  await io.integrationPage.click(selectors.flowBuilderPagePO.EDIT_README);
  await io.homePage.loadingTime();
  const textarea = await page.$(selectors.integrationPagePO.READMEEDITOR);
  if (textarea) {
    // Click the textarea to focus on it
    await textarea.click();
    // Select all text and delete it
    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
  }
  await io.homePage.fill(selectors.integrationPagePO.README_TEXTAREA, "test data");
  await io.integrationPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
  await io.homePage.loadingTime();
  await io.integrationPage.click(selectors.flowBuilderPagePO.EDIT_README);
  const isRevisionsDisplayed = await io.flowBuilder.isVisible("text='test data'");
  await io.assert.expectToBeTrue(isRevisionsDisplayed, "EDited text  is displayed");
  const textareaReopened = await page.$(selectors.integrationPagePO.READMEEDITOR);

  if (textareaReopened) {
    // Click the textarea to focus on it
    await textareaReopened.click();
    // Select all text and delete it
    await io.homePage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
  }
  });
});