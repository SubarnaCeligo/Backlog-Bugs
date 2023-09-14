import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C93649 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.', () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test('C93649 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.', async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Resources","Scripts");

    await io.flowBuilder.clickByText("Create script");
    // Ensure that the choose function stub field is visible
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
    const chooseFunctionStubField = await page.$(
      selectors.basePagePO.FUNCTION_STUB
    );
    await io.flowBuilder.selectTextfromDropDown(page, "postResponseMap");

    const expectedText = "Post response map"; // The expected random text

    const divTextContent = await chooseFunctionStubField.textContent();

    expect(divTextContent).toEqual(expectedText);
  });
});
