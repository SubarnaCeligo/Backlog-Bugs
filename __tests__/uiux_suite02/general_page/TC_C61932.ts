import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C61932 App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", () => {
  test("@Env-All @Zephyr-IO-T2222 C61932 App crash should not happen if we change IO url something like 'https://qa.staging.integrator.io///[https://qaprod.staging.integrator.io] ' based on the current environment", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
      await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
      await page.goto('https://qaprod.staging.integrator.io');
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.EMAIL, 'Email input is not displayed after sign out');
      await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.PASSWORDINPUT, 'Password input is not displayed after sign out');
  });
});