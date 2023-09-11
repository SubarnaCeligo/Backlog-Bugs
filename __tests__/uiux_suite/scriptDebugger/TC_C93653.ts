import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C30651 from "@testData/Flows/C26246.json";

test.describe('C93653 Validate user is able to create "branching" script through flow builder page', () => {
  test('C93653 Validate user is able to create "branching" script through flow builder page', async ({
    io,
    page
  }) => {
    const id = await io.fillFormUI(C30651, "FLOWS");

    await io.flowBuilder.click(
      selectors.exportsPagePO.EXPORT_ADDPROCESSOR_BUTTON
    );

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_HOOK);

    await page.getByLabel("Create script").click();

    await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");

    // Ensure that the choose function stub field is visible
    const chooseFunctionStubField = await page.$(
      selectors.basePagePO.FUNCTION_STUB
    );
    await chooseFunctionStubField.click();

    await io.flowBuilder.selectTextfromDropDown(page, "router");
    // Scroll through the list of options to find "Transform"

    await io.flowBuilder.clickByText("Save & close");

    // await page.pause();
  });
});
