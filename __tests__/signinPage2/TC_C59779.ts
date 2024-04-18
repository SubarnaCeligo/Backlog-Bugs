import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C59779 Verify the hyperlinks for Terms of Service / Service Subscription Agreement and Privacy Policy in sign up page", () => {
  test("@Env-All @Zephyr-IO-T1381 TC_C59779 Verify the hyperlinks for Terms of Service / Service Subscription Agreement and Privacy Policy in sign up page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // await io.homePage.waitForElementAttached(
    //   selectors.basePagePO.ACCOUNT_SELECTOR
    // );
    // const isLoggedIn = await io.loginPage.checkLoginState();
    // if (!isLoggedIn) {
    //   await io.myAccountPage.clickByIndex(
    //     selectors.basePagePO.ACCOUNT_SELECTOR,
    //     1
    //   );
    //   await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    // }
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText(
      "Terms of Service / Service Subscription Agreement"
    );
    const page1 = await io.homePage.switchWindow();
    await io.flowBuilder.loadingTime();
    await expect((await page1.title()).toString()).toBe(
      "Terms of Service - Celigo"
    );
    await page1.close();
    await io.homePage.switchWindow();
    await io.flowBuilder.clickByText("Privacy Policy");
    await io.flowBuilder.loadingTime();
    const page2 = await io.homePage.switchWindow();
    await io.flowBuilder.loadingTime();
    expect((await page2.title()).toString()).toBe(
      "Celigo Privacy and Cookie Policy - Celigo"
    );
  });
});
