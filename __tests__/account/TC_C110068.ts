import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import { expect } from "@celigo/ui-core-automation";

test.describe("TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", async ({
    io,
    page
  }) => {
    await io.homePage.loadingTime();
    // navigate to my account page
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON);
    // Click on edit email button
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_EMAIL);
    await io.myAccountPage.fill(
      selectors.basePagePO.NEW_EMAIL,
      "qaautomation1+emailcheck1@celigo.com"
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
    await page.waitForTimeout(10000);
    await io.myAccountPage.waitForElementAttached(
      selectors.basePagePO.CLOSE_BUTTON
    );
    await io.myAccountPage.click(selectors.basePagePO.CLOSE_BUTTON);
    // sign out of IO and navigate to login page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    await page.waitForTimeout(5000);
    const link = await io.emailVal.getLinkFromEmail(
      "[qa.staging.integrator.io] Request to change your email",
      false,
      "pwqa1"
    );
    await io.flowBuilder.loadingTime();
    let AccountTab = ".MuiToolbar-root .MuiSvgIcon-root";
    let AccountTab1 = await page.$$(".MuiToolbar-root .MuiSvgIcon-root");
    await page.waitForTimeout(20000);
    let last = (await AccountTab1.length) - 1;
    let x = AccountTab;
    if (!isNotLoggedIn) {
      // await io.homePage.waitForElementAttached(AccountTab[last]);
      await io.myAccountPage.clickByIndex(AccountTab, last);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
    // check for link in email and navigate to that link
    await page.waitForTimeout(15000);
    await io.homePage.navigateTo(link.toString());
    await io.homePage.reloadPage();
    await io.homePage.reloadPage();
    await io.loginPage.fill(
      selectors.loginPagePO.EMAIL,
      "qaautomation1+emailcheck1@celigo.com"
    );
    await io.loginPage.fill(
      selectors.loginPagePO.PASSWORD,
      decrypt(process.env["IO_Password"])
    );
    await io.loginPage.click(selectors.basePagePO.SUBMIT);
    await page.waitForTimeout(10000);

    //click on agent token and validate
    await io.homePage.goToMenu("Resources", "Agents");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    let agentselect = '[data-test="displayAgentToken"]';
    await io.flowBuilder.click(agentselect);
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
    await io.flowBuilder.loadingTime();
    const isNotLoggedIn1 = await io.loginPage.checkLoginState();
    await page.waitForTimeout(10000);
    const link1 = await io.emailVal.getLinkFromEmail(
      "[qa.staging.integrator.io] Request to change your email",
      false,
      "pwqa1"
    );
    await io.flowBuilder.loadingTime();
    let Account1Tab = ".MuiToolbar-root .MuiSvgIcon-root";
    let Account1Tab1 = await page.$$(".MuiToolbar-root .MuiSvgIcon-root");
    await page.waitForTimeout(20000);
    let last1 = (await Account1Tab1.length) - 1;

    if (!isNotLoggedIn1) {
      // await io.homePage.waitForElementAttached(AccountTab[last]);
      await io.myAccountPage.clickByIndex(Account1Tab, last1);
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
});
