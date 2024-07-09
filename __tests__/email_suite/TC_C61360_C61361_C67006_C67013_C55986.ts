import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe("C61360_C61361_C67006_C67013_C55986", () => {
  test("@Env-All @Zephyr-IO-T22225 @Zephyr-IO-T22218 @Zephyr-IO-T22166 @@Zephyr-IO-T22172 @Zephyr-IO-T1086 C61360_C61361_C67006_C67013_C55986  Verify that there shouldn't be any Get Unlimited flows button in home page for newly signed up accounts &  Verify that there shouldnt be any popup message saying Start free trail now to experience optimal process automation for your business with full access to integrator.io . For 30 days, the unlimited flow trial gives you: in home page for newly signe", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
    await io.homePage.delay(1000 * 60 * 3);
    await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
    await io.homePage.loadingTime();
    await io.signInPage.fill(selectors.basePagePO.NAME, "Test Auto");
    let email = `qaautomation1+${
      randomString(5) + randomNumber(5)
    }emailsuite@celigo.com`;
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, email);
    await io.signInPage.fill(selectors.loginPagePO.COMPANY, "Celigo");
    await io.signInPage.click(selectors.basePagePO.AGREETOSANDPP);
    await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    await page.waitForTimeout(5000);
    // @ts-ignore
    let link = await io.emailVal.getLinkFromEmail(
      "Activate your Celigo staging.integrator.io account",
      true,
      "pwqa1"
    );
    await io.homePage.navigateTo(link[0].split("<br>")[0]);
    await io.homePage.loadingTime();
    const password = "C!" + randomString(5) + randomNumber(5);
    await io.signInPage.fill(selectors.loginPagePO.PASSWORD, password);
    await io.signInPage.click(selectors.basePagePO.SUBMIT);
    await io.homePage.loadingTime();
    const regex = /home$/;
    await page.waitForURL(regex);
    await io.homePage.waitForElementAttached(
      selectors.basePagePO.ACCOUNT_SELECTOR
    );
    const msg = await io.homePage.isVisible("text='Get Unlimited flows'");
    await io.assert.expectToBeValue(
      msg.toString(),
      "false",
      "above msg is popped up"
    );
    const msg1 = await io.homePage.isVisible(
      "text='Start free trail now to experience optimal process automation for your business with full access to integrator.io . For 30 days, the unlimited flow trial gives you'"
    );
    await io.assert.expectToBeValue(
      msg1.toString(),
      "false",
      "above msg is popped up"
    );
  });
});
