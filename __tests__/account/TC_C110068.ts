import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import { expect } from "@celigo/ui-core-automation";

test.describe("TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", async () => {
  test.beforeEach(async ({ io }, testInfo) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T10059 TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", async ({
    io,
    page
  }, testInfo) => {
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
    await io.homePage.loadingTime();
    await page.waitForTimeout(10000);
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
    await io.homePage.loadingTime();

    //click on agent token and validate
    await io.homePage.goToMenu("Resources", "Agents");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.DISPLAY_AGENT_TOKEN);
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
    await page.waitForTimeout(20000);
    if (!isNotLoggedIn) {
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }

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
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    console.log(`${testInfo.status}`);
    if (testInfo.status == "failed") {
      await io.homePage.navigateTo(process.env["IOURL"]);
      await io.homePage.loadingTime();
      await io.loginPage.fill(
        selectors.loginPagePO.EMAIL,
        "qaautomation1+emailcheck5@celigo.com"
      );
      await io.loginPage.fill(
        selectors.loginPagePO.PASSWORD,
        decrypt(process.env["IO_Password"])
      );
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
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
      await page.waitForTimeout(5000);
      // sign out of IO and navigate to login page
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      let url1 = new URL(process.env["IO_UI_CONNECTOR_URL"]);
      const link = await io.emailVal.getLinkFromEmail(
        "[" + url1.host + "] Request to change your email",
        false,
        "pwqa1"
      );
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
      await io.loginPage.fill(selectors.loginPagePO.EMAIL, "qaautomation1+emailcheck@celigo.com");
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
      await io.loginPage.click(selectors.basePagePO.SUBMIT);
      testInfo.retry;
    }
  });
});
