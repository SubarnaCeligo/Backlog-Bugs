import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/Flows/C22915_testdata1.json";

test.describe("TC_IO-T5411 Verify toggle selection is persistent", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T5411 @Env-All @Priority-P2 C23857 Verify toggle selection is persistent", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.addStep('*** Opening Export ***');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);

    await io.flowBuilder.addStep('*** Opening Handlebar editor ***');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText('Advanced');
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);

    await io.flowBuilder.addStep('*** Switching to AFE 1.0 and verifying the toggle ***')
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.flowBuilder.loadingTime();
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
    await io.exportsPage.loadingTime();

    await io.exportsPage.fill(selectors.flowBuilderPagePO.FDR_TEXTAREA, '{{exports.name}}');

    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SAVE_CHANGE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SAVE_CHANGE);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    await io.flowBuilder.loadingTime();
    let AFE2 = page.locator(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    let AFE1 = page.locator(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    expect(AFE2).toHaveAttribute('aria-pressed', 'false');
    expect(AFE1).toHaveAttribute('aria-pressed', 'true');
  });
});