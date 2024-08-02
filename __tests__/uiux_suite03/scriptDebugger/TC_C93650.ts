import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93650Validate that user is getting prefill function stub for "formInit" function', () => {
   
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test('@Env-All @Zephyr-IO-T22617 C93650 Validate that user is getting prefill function stub for "formInit" function', async ({
    io,
    page
  }) => {
    await io.homePage.clickByText("Resources")
    await io.homePage.clickByText("Scripts")
    await io.flowBuilder.clickByText("Create script");
    // Ensure that the choose function stub field is visible
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
    await io.flowBuilder.addStep("Clicked on function stub button")
    await io.flowBuilder.selectTextfromDropDown(page,"formInit");
    await io.flowBuilder.addStep("locating the formInit buttton selector")
    let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
   await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
  });
});
