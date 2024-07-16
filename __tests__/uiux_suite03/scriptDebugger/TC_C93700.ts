import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93700 Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.(Manage)', () => {
   
    test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env-All @Zephyr-IO-T22676 C93709 Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.(Manage)', async ({
      io,
      page
    }) => {
      await io.homePage.clickByText("Resources")
      await io.homePage.clickByText("Scripts")
      await io.flowBuilder.clickByText("Create script");
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FORM_INIT_FUNCTION,"Element is present")
    });
  });