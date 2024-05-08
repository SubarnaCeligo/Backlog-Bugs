import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import { expect } from "@celigo/ui-core-automation";

test.describe("TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", async () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T10059 TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", async ({
    io,
    page
  }, testInfo) => {
    let signInLink = await page.url();
    if (signInLink.endsWith("signin")) {
      await io.loginPage.fill(
        selectors.loginPagePO.EMAIL,
        "qaautomation1+emailcheck5@celigo.com"
      );
      await io.loginPage.fill(
        selectors.loginPagePO.PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.flowBuilder.delay(1000 * 60 * 2);
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      let rateLimitErrorsVisibility = await page
        .locator('[id="error-icon"] ~ div')
        .isVisible();
      if (rateLimitErrorsVisibility) {
        let rateLimitErrors = await page
          .locator("[id='error-icon'] ~ div")
          .textContent();
        let rateLimitErrorTime = await String(rateLimitErrors).match(/\d/g).join("");
        await io.flowBuilder.delay(1000 * Number(rateLimitErrorTime));
        await io.loginPage.click(selectors.basePagePO.SUBMIT);
      }
      await io.homePage.loadingTime();
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.homePage.loadingTime();
      await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON);
      // Click on edit email button
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.NEW_EMAIL
      );
      await io.myAccountPage.fill(
        selectors.basePagePO.NEW_EMAIL,
        "qaautomation1+emailcheck@celigo.com"
      );
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.NEW_PASSWORD
      );
      await io.myAccountPage.fill(
        selectors.basePagePO.NEW_PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.CHANGE_EMAIL
      );
      await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
      await io.myAccountPage.waitForElementAttached(
        selectors.basePagePO.CLOSE_BUTTON
      );
      await io.myAccountPage.click(selectors.basePagePO.CLOSE_BUTTON);
      let iourl = new URL(process.env["IO_UI_CONNECTOR_URL"]);
      await page.waitForTimeout(5000);
      const webHostLink = await io.emailVal.getLinkFromEmail(
        "[" + iourl.host + "] Request to change your email",
        false,
        "pwqa1"
      );
      await io.flowBuilder.delay(1000 * 60 * 2);
      // sign out of IO and navigate to login page
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.navigateTo(webHostLink.toString());
      await io.flowBuilder.loadingTime();
      await io.flowBuilder.navigateTo(process.env.IOURL);
      await io.flowBuilder.loadingTime();
      await io.loginPage.fill(
        selectors.loginPagePO.EMAIL,
        "qaautomation1+emailcheck@celigo.com"
      );
      await io.loginPage.fill(
        selectors.loginPagePO.PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      if (rateLimitErrorsVisibility) {
        let rateLimitErrors = await page
          .locator("[id='error-icon'] ~ div")
          .textContent();
        let rateLimitErrorTime = await String(rateLimitErrors).match(/\d/g).join("");
        await io.flowBuilder.delay(1000 * Number(rateLimitErrorTime));
        await io.loginPage.click(selectors.basePagePO.SUBMIT);
      }
    }
    await io.homePage.loadingTime();
    // navigate to my account page
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON);
    // Click on edit email button
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_EMAIL);
    await io.myAccountPage.fill(
      selectors.basePagePO.NEW_EMAIL,
      "qaautomation1+emailcheck5@celigo.com"
    );
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.NEW_PASSWORD
    );
    await io.myAccountPage.fill(
      selectors.basePagePO.NEW_PASSWORD,
      decrypt(process.env["IO_Password"])
    );
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.CHANGE_EMAIL
    );
    await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.CLOSE_BUTTON
    );
    await io.myAccountPage.click(selectors.basePagePO.CLOSE_BUTTON);
    // sign out of IO and navigate to login page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    await page.waitForTimeout(5000);
    let url = new URL(process.env["IO_UI_CONNECTOR_URL"]);
    let envurl = url.host;
    console.log("Remaining URL:", envurl);
    const link = await io.emailVal.getLinkFromEmail(
      "[" + envurl + "] Request to change your email",
      false,
      "pwqa1"
    );
    await io.flowBuilder.delay(1000 * 60 * 2);
    await io.homePage.loadingTime();
    if (!isNotLoggedIn) {
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
    // check for link in email and navigate to that link
    await page.waitForTimeout(5000);
    await io.homePage.navigateTo(link.toString());
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    await io.loginPage.fill(
      selectors.loginPagePO.EMAIL,
      "qaautomation1+emailcheck5@celigo.com"
    );
    await io.loginPage.fill(
      selectors.loginPagePO.PASSWORD,
      decrypt(process.env["IO_Password"])
    );
    await io.loginPage.click(selectors.basePagePO.SUBMIT);
    let rateLimitErrorsVisibility = await page
      .locator('[id="error-icon"] ~ div')
      .isVisible();
    if (rateLimitErrorsVisibility) {
      let rateLimitErrors = await page
        .locator("[id='error-icon'] ~ div")
        .textContent();
      let rateLimitErrorTime = await String(rateLimitErrors).match(/\d/g).join("");
      await io.flowBuilder.delay(1000 * Number(rateLimitErrorTime));
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
    }
    await io.homePage.loadingTime();

    //click on agent token and validate
    await io.homePage.goToMenu("Resources", "Agents");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.basePagePO.DISPLAY_AGENT_TOKEN
    );
    await io.flowBuilder.click(selectors.basePagePO.DISPLAY_AGENT_TOKEN);
    await page.waitForTimeout(10000);

    const agentlink = await io.emailVal.getLinkFromEmail(
      "ALERT: Agent access token was displayed in clear text",
      true,
      "pwqa1"
    );
    let result = agentlink.toString();
    let validate = false;
    if (result.includes("agent")) {
      validate = true;
    }
    expect(validate).toBeTruthy();

    // //revert email to orginal
    await io.homePage.loadingTime();
    // navigate to my account page
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.homePage.loadingTime();
    await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON);
    // Click on edit email button
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_EMAIL);
    await io.myAccountPage.fill(
      selectors.basePagePO.NEW_EMAIL,
      "qaautomation1+emailcheck@celigo.com"
    );
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.NEW_PASSWORD
    );
    await io.myAccountPage.fill(
      selectors.basePagePO.NEW_PASSWORD,
      decrypt(process.env["IO_Password"])
    );
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.CHANGE_EMAIL
    );
    await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.CLOSE_BUTTON
    );
    await io.myAccountPage.click(selectors.basePagePO.CLOSE_BUTTON);

    // // signin of IO and navigate to login page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    const link1 = await io.emailVal.getLinkFromEmail(
      "[" + envurl + "] Request to change your email",
      false,
      "pwqa1"
    );
    if (!isNotLoggedIn) {
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
    await io.homePage.delay(1000 * 100 * 2);
    //Start TC_C1655 - Email Change Link continues to work even after changing the password
    await io.homePage.navigateTo(link.toString());
    const errorMessage = (
      await io.homePage.getText(selectors.basePagePO.H3_TEXT_SELECTOR)
    ).toString();
    await io.assert.expectToContainValue(
      errorMessage,
      "Failed to change email address.",
      "Link is still valid"
    );
    //End TC_C1655

    // check for link in email and navigate to that link

    await page.waitForTimeout(10000);
    await io.homePage.navigateTo(link1.toString());
    await io.homePage.loadingTime();
    await io.loginPage.fill(
      selectors.loginPagePO.EMAIL,
      "qaautomation1+emailcheck@celigo.com"
    );
    await io.loginPage.fill(
      selectors.loginPagePO.PASSWORD,
      decrypt(process.env["IO_Password"])
    );
    await io.loginPage.click(selectors.basePagePO.SUBMIT);
    let rateLimitErrorsVisibility1 = await page
      .locator('[id="error-icon"] ~ div')
      .isVisible();
    if (rateLimitErrorsVisibility1) {
      let rateLimitErrors = await page
        .locator("[id='error-icon'] ~ div")
        .textContent();
      let rateLimitErrorTime = await String(rateLimitErrors).match(/\d/g);
      let rateLimitErrorTime1 = rateLimitErrorTime.join("");
      await io.flowBuilder.delay(1000 * Number(rateLimitErrorTime1));
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
    }
  });
});
