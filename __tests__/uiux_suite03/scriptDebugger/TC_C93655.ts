import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93655.json";

test.describe('C93655 Validate user is able to create "filter" script through flow builder page', () => {
  test('@Env-All @Zephyr-IO-T22622 C93655 Validate user is able to create "filter" script through flow builder page', async ({
    io,
    page
  }) => {
    const id = await io.createResourceFromAPI(data, "FLOWS");
    await io.flowBuilder.click(
      selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON
    );
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_SCRIPT_ARIA_LABEL);
    await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
    const elementSelector = selectors.basePagePO.FILTER_FUNCTION;
    const element = await page.locator(elementSelector);
    await element.scrollIntoViewIfNeeded();
    await io.flowBuilder.click(elementSelector);
    await io.flowBuilder.clickByText("Save & close");
  });
});
