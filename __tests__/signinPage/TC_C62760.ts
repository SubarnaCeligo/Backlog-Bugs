import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C62760 TO verify that the iFrame is loading fine when user log outs from IO account", () => {
    test.beforeEach('check sign out', async ({ io, page }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        const isNotLoggedIn = await io.loginPage.checkLoginState();
        if (!isNotLoggedIn) {
          await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
          await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
          await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
          await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
        }
      })
    test("C62760TO verify that the iFrame is loading fine when user log outs from IO account", async ({io, page}) => {
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        await io.homePage.click(selectors.homePagePO.SIGN_OUT)
        expect(await page.locator(selectors.loginPagePO.IFRAME)).toBeVisible();
    });
});
