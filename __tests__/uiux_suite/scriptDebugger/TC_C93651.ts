import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C93651Validate that user is getting prefill function stub for "postResponseMap" function', () => {
   
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test('C93651 Validate that user is getting prefill function stub for "postResponseMap" function', async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Resources","Scripts");
    await io.flowBuilder.clickByText("Create script");
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
    await io.flowBuilder.selectTextfromDropDown(page, "postResponseMap");
    const divSelector = selectors.basePagePO.ACE_CONTENT; // Selector for the <div> element
    // Check if the selector matches an element
    const divElement = await page.$(divSelector);
    const divTextContent = await divElement.textContent();
    expect(divTextContent).not.toBeNull();
  });
});
