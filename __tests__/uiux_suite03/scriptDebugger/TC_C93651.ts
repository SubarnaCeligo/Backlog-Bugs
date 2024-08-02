import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C93651Validate that user is getting prefill function stub for "postResponseMap" function', () => {
   
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test('@Env-All @Zephyr-IO-T22618 C93651 Validate that user is getting prefill function stub for "postResponseMap" function', async ({
    io,
    page
  }) => {
    await io.homePage.click(selectors.basePagePO.RESOURCES)
    await io.homePage.clickByText("Scripts");
    await io.flowBuilder.clickByText("Create script");
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);   
    await io.flowBuilder.selectTextfromDropDown(page, "postResponseMap");
    let divTextContent = await io.flowBuilder.getText(selectors.basePagePO.ACE_CONTENT);
   await io.assert.expectNotToBeNull(divTextContent,"Value is not null")
  });
});
