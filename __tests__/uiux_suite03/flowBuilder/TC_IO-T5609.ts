import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe("TC_IO-T5609 Verify the background of preview Error panel in AFEs should be red in different browsers( Chrome, Safari, Firefox)", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T5609 C39808 Verify the background of preview Error panel in AFEs should be red in different browsers( Chrome, Safari, Firefox)", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C45341, "FLOWS");
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.flowBuilder.loadingTime();
    const element = page.locator(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
    await element.scrollIntoViewIfNeeded();
    await io.flowBuilder.clickByTextByIndex('Add condition', 0);
    await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test', 0);
    await page.keyboard.press('Enter');
   
  //click on handlebar:
  await io.exportsPage.clickByIndex(selectors.exportsPagePO.FILE_FILTER_HANDLEBAR, 0);
  await io.exportsPage.waitForElementAttached( selectors.flowBuilderPagePO.RULE);

  // Locate the textarea
 
  const ruleTextarea = await page.$(selectors.flowBuilderPagePO.RULE);

  if (ruleTextarea) {
    // Click the textarea to focus on it
    await ruleTextarea.click();

    // Select all text and delete it
    await io.exportsPage.loadingTime();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
  }
  //Add new FDR
  await io.exportsPage.loadingTime();

  await io.exportsPage.fill(selectors.flowBuilderPagePO.FDR_TEXTAREA, '{{exports[0].name}}');
  await io.exportsPage.click(selectors.flowBuilderPagePO.PREVIEW);
  await io.exportsPage.loadingTime();
  await expect(page.locator(selectors.exportsPagePO.ERROR_ACCORDION_SUMMARY)).toBeVisible();

  const backgroundColor = await page
  .locator(selectors.exportsPagePO.ERROR_ACCORDION_SUMMARY)
  .first()
  .evaluate(el => {
    const parentDiv = el.parentElement;
    return getComputedStyle(parentDiv).background;
  });
  const expectedValue = "rgba(255, 99, 99, 0.06)";
  const containsExpectedValue = backgroundColor.includes(expectedValue)
  await expect(containsExpectedValue).toBe(true);

  });
});
