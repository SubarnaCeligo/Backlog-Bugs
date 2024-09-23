import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C21037 from "@testData/FlowBuilder/TC_C21037.json";

test.describe("TC_C21037", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T2978|To verify unchecking `Discard If empty` checbox in mappings.", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C21037);
    flowId = await io.api.getFlowId(TC_C21037.name);
    await io.flowBuilder.navigateToTheFlow(
      flowId
    );
    await io.homePage.loadingTime();

    // Clicking on import mapping
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    test.step("*** Clicked on import mapping ***", async () => { });
    // Clicked on mapping setting button
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    await io.homePage.loadingTime();
    test.step("*** Click on settings button ***", async () => { });
    // Check immutable option
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DISCARD_IF_EMPTY
    );
    await io.homePage.loadingTime();
    const val = await page.locator('[name="discardIfEmpty"]').getAttribute('value');
    expect(val).toBe('true');
    test.step("*** Clicking on save and close button ***", async () => { });
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    // Clicked on mapping settings button
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS
    );
    await io.homePage.loadingTime();
    test.step("*** Click on settings button ***", async () => { });
    // Uncheck immutable option
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DISCARD_IF_EMPTY
    );
    await io.homePage.loadingTime();
    const val2 = await page.locator('[name="discardIfEmpty"]').getAttribute('value');
    expect(val2).toBe('false');
    // Click on save and close button
    test.step("*** Clicking on save and close button ***", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );
    await io.api.deleteFlowsWithId([flowId]);
  });
});
