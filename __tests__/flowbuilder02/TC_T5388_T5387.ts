import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/Flows/C22915_testdata1.json";

test.describe("TC_T5388_T5387 Verify the right side of the AFE toggle, Buttons and links are present on all different browsers", () => {
  test.describe.configure({ retries: 2 })
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T5387 @Zephyr-IO-T5388 @Env-All @Priority-P2 T5388_T5387 Verify the right side of the AFE toggle, Buttons and links are present on all different browsers UI_Backlog", async ({
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
    let AFE2 = page.locator(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    let AFE1 = page.locator(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    expect(AFE2).toHaveAttribute('aria-pressed', 'false');
    expect(AFE1).toHaveAttribute('aria-pressed', 'true');

    await io.flowBuilder.addStep('*** Switching to AFE 2.0 and verifying the toggle ***')
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.flowBuilder.loadingTime();
    AFE2 = page.locator(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    AFE1 = page.locator(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    expect(AFE2).toHaveAttribute('aria-pressed', 'true');
    expect(AFE1).toHaveAttribute('aria-pressed', 'false');

    await io.flowBuilder.addStep('*** Validating the preview and auto preview buttons ***')
    await expect(page.locator(selectors.flowBuilderPagePO.AUTO_PREVIEW), 'Auto preview is not visible').toBeVisible();
    await expect(page.locator(selectors.flowBuilderPagePO.PREVIEW), 'Preview is not visible').toBeVisible();

    await io.flowBuilder.addStep('*** Validating the layout toggle ***')
    await expect(page.locator(selectors.playgroundPO.LAYOUT_TOGGLE), 'Layout toggle is not visible').toBeVisible();

    await io.flowBuilder.addStep("*** Validating the handlebar's guide ***'")
    await expect(page.getByRole('link', { name: 'Handlebars guide' })).toBeVisible();

    await io.flowBuilder.addStep('*** Validating the close right right drawer ***');
    await expect(page.locator(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER), 'Close drawer button is not visible').toBeVisible();

    await io.flowBuilder.addStep('*** Validating the layout ***');
    await expect(page).toHaveScreenshot('afedrawer.png', { maxDiffPixelRatio: 0.2 });
  });
});