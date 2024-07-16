import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import data from "@testData/ScriptDebugger/C93652.json";

test.describe('C93652 Validate user is able to create "transform" script through flow builder page', () => {
  test('@Env-All @Zephyr-IO-T22619 C93652 Validate user is able to create "transform" script through flow builder page', async ({
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
    await io.flowBuilder.selectTextfromDropDown(page, "transform");
    await io.flowBuilder.clickByText("Save & close");
    await io.flowBuilder.waitForElementAttached(':has-text("mockscript")');
    await io.assert.verifyElementText(
      selectors.flowBuilderPagePO.SCRIPT_ID,
      "mockscript"
    );
    await io.assert.checkElementState(selectors.flowBuilderPagePO.SCRIPT_ID,"isVisible");
  });
});
