import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C61361 Verify that there shouldnt be any popup message saying Start free trail now to experience optimal process automation for your business with full access to integrator.io . For 30 days, the unlimited flow trial gives you: in home page for newly signe", () => {
  test("C61361 Verify that there shouldnt be any popup message saying Start free trail now to experience optimal process automation for your business with full access to integrator.io . For 30 days, the unlimited flow trial gives you: in home page for newly signe", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(
      selectors.basePagePO.ACCOUNT_SELECTOR
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.ACCOUNT_SELECTOR,
      1
    );
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
    await io.signInPage.fill(selectors.basePagePO.NAME, "Test Auto");
    let email = `qaautomation1+${randomString(5) + randomNumber(5)}@celigo.com`;
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, email);
    await io.signInPage.fill(selectors.loginPagePO.COMPANY, "Celigo");
    await io.signInPage.click(selectors.basePagePO.AGREETOSANDPP);
    await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    // @ts-ignore
    let link = await io.emailVal.getLinkFromEmail("Activate your Celigo staging.integrator.io account", true, "pwqa1");
    await io.homePage.navigateTo(link[0].split("<br>")[0]);
    const password = "C!" + randomString(5) + randomNumber(5);
    await io.signInPage.fill(selectors.loginPagePO.PASSWORD, password);
    await io.signInPage.click(selectors.basePagePO.SUBMIT);
   
    const regex = /home$/;
    await page.waitForURL(regex);
    await io.homePage.waitForElementAttached( selectors.basePagePO.ACCOUNT_SELECTOR)
    const msg =await io.homePage.isVisible("text='Start free trail now to experience optimal process automation for your business with full access to integrator.io . For 30 days, the unlimited flow trial gives you'")
    await io.assert.expectToBeValue(msg.toString(),"false", "above msg is popped up");
  });
});