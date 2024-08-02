import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93706 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.(Administer)', () => {
   
    test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env-All @Zephyr-IO-T22673 C93706 Validate that user is able to see "postResponseMap" function wherever “Insert function stub” field is present.(Administer)', async ({
      io,
      page
    }) => {
      await io.homePage.clickByText("Resources")
      await io.homePage.clickByText("Scripts")
      await io.flowBuilder.clickByText("Create script");
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
      await io.flowBuilder.selectTextfromDropDown(page, "postResponseMap");
    const expectedText = "Post response map"; // The expected random text
    await io.assert.verifyElementContainsText( selectors.basePagePO.FUNCTION_STUB,expectedText)
    });
  });