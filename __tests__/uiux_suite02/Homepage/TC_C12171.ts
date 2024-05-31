import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C12171 Verify the tiles displayed in UI when user switch between production environment to sandbox`, () => {
  test(`@Env-All @Zephyr-IO-T875 C12171 Verify the tiles displayed in UI when user switch between production environment to sandbox`, async ({io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON)
    await io.assert.verifyElementIsDisplayed(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Sandbox not loaded properly');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
  });
});
