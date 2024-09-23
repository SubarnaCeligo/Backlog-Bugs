import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C20709 from "@testData/FlowBuilder/TC_C20709.json";

test.describe("TC_C20709", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T2782|Unable to uncheck immutable checkbox in mappings.", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C20709);
    flowId = await io.api.getFlowId(TC_C20709.name)
    await io.flowBuilder.navigateToTheFlow(
      [flowId]
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    // Clicking on import mapping
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    test.step("*** Clicked on import mapping ***", async () => { });
    // Clicked on mapping setting button
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    test.step("*** Click on settings button ***", async () => { });
    // Check immutable option
    await io.homePage.click(selectors.mappings.IMMUTABLEOPTIONCHECK);
    const opt = await page.locator(
      selectors.mappings.IMMUTABLE_CHECKBOX
    )
    const checked = await opt.getAttribute('value');
    console.log(checked);
    await io.homePage.loadingTime();
    expect(checked).toBe("true");
    test.step("*** Clicking on save and close button ***", async () => { });
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    // Clicked on mapping settings button
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    // Uncheck immutable option
    await io.homePage.click(selectors.mappings.IMMUTABLEOPTIONCHECK);
    await io.homePage.loadingTime();
    const checked2 = await opt.getAttribute('value');
    expect(checked2).not.toBe("true");
    // Click on save and close button
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
  });
});
