import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe('C93696 Validate that user is able to see "postResponseMap" function in “Insert function stub” field while creating a script (Manage)', () => {
  test('@Env-All @Zephyr-IO-T22663 C93696 Validate that user is able to see "postResponseMap" function in “Insert function stub” field while creating a script (Manage)', async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.clickByText("Resources")
    await io.homePage.clickByText("Scripts")
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.click(selectors.basePagePO.FUNCTION_STUB);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.POST_RESPONSE_MAP,"Element is present")
  });
});