import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C63261 Verify 'Learn More' link on MFA page pointing to a correct KB article.", () => {
  test.beforeEach("check sign out", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime()
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await io.homePage.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
  });
  test.skip("@Env-All @Zephyr-IO-T17256 Verify 'Learn More' link on MFA page pointing to a correct KB article.", async ({
    io,
    page
  }) => {
    await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
    await io.signInPage.fill(
      selectors.loginPagePO.EMAIL,
      process.env["MFA_Invited_UserName"]
    );
    await io.signInPage.fill(
      selectors.loginPagePO.PASSWORD,
      decrypt(process.env["MFA_Invited_Password"])
    );
    await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
    await io.signInPage.waitForElementAttached(':has-text("Trust this device")');
    const articleUrl = await page.getByText("Learn more").getAttribute("href");
    await io.assert.expectToBeValue(
      articleUrl,
      "https://docs.celigo.com/hc/en-us/articles/7127009384987-Set-up-multifactor-authentication-MFA-for-your-account",
      "Incorrect article URL"
    );
  });
});
