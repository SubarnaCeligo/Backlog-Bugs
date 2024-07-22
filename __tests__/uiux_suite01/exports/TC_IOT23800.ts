import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C45341 from "@testData/Flows/C45341.json";

test.describe("TC_IOT22458 Verify in edit case when user add new mappings the focus of the cursor should be in destination column", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
  });

  test("@Env-All @Zephyr-IO-T22458 C51869 Verify in edit case when user add new mappings the focus of the cursor should be in destination column", async ({
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
    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    // Locate the textarea
   
    const textarea = await page.$(selectors.exportsPagePO.CUSTOM_SETTINGS_AREA);
    if (textarea) {
      // Click the textarea to focus on it
      await textarea.click();
  
      // Select all text and delete it
      await io.exportsPage.loadingTime();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
    }
    await io.exportsPage.loadingTime();
    await io.exportsPage.fill(selectors.exportsPagePO.CUSTOM_SETTINGS_TEXT_AREA, '{"name" : "testfile"}');

    //Filling file filtering condition:
  await io.exportsPage.loadingTime();
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

  await io.exportsPage.fill(selectors.flowBuilderPagePO.FDR_TEXTAREA, '{{settings.export.name}}');
  await io.exportsPage.click(selectors.flowBuilderPagePO.PREVIEW);
  await io.exportsPage.loadingTime();
  await io.homePage.waitForElementAttached("text='testfile'")
  const label = await io.homePage.isVisible("text='testfile'")
  await io.assert.expectToBeTrue(label, "Label not found")

  await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
  await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SAVE_CHANGE);
  await io.flowBuilder.click(selectors.flowBuilderPagePO.SAVE_CHANGE);
  await io.flowBuilder.loadingTime();

  await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
   
  
  });
});
