import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93702 Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.(Administer)', () => {
   
    test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env-All @Zephyr-IO-T22669 C93702 Validate that user is able to see "formInit" function wherever “Insert function stub” field is present.(Administer)', async ({
      io,
      page
    }) => {
      await io.homePage.click(selectors.basePagePO.RESOURCES)
      await io.homePage.clickByText("Scripts");
      await io.flowBuilder.clickByText("Create script");
      await io.flowBuilder.fill(selectors.importPagePO.NAME, "mockscript");
      await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FORM_INIT_FUNCTION,"Element is present")
    });
  });