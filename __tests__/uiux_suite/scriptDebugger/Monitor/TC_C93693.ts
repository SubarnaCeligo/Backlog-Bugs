import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93693 Validate that user is able to see "formInit" function in “Insert function stub” field while creating a script (Monitor)', () => {
  test('C93693 Validate that user is able to see "formInit" function in “Insert function stub” field while creating a script (Monitor)', async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.goToMenu("Resources","Scripts");
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.FORM_INIT_FUNCTION,"Element is present")
  });
});