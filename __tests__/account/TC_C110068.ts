import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import { expect } from "@celigo/ui-core-automation";

test.describe("TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test("TC_C110068 when user email is changed from profile page, verify Email Notification Generation when clicked on show token for an Agent in Agents Page", async ({ io, page }) => {
    await io.homePage.loadingTime()
    // navigate to my account page
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON)
    // Click on edit email button
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_EMAIL)
    console.log("user name: " + process.env.IO_UserName)
    await io.myAccountPage.fill(selectors.basePagePO.NEW_EMAIL, "qaautomation1+emailcheck1@celigo.com")
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_PASSWORD)
    await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.CHANGE_EMAIL)
    await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.CLOSE_BUTTON)
    await io.myAccountPage.click(selectors.basePagePO.CLOSE_BUTTON);
    // sign out of IO and navigate to login page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await io.homePage.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
    // check for link in email and navigate to that link
    await page.waitForTimeout(5000);
    const link = await io.emailVal.getLinkFromEmail(
      "[qa.staging.integrator.io] Request to change your email", false, "pwqa1"
    );
    console.log("link: " + link.toString())
    await io.homePage.navigateTo(link.toString());
    await io.loginPage.fill(selectors.loginPagePO.EMAIL, "qaautomation1+emailcheck1@celigo.com");
    await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    await io.loginPage.click(selectors.basePagePO.SUBMIT);

    //click on agent token and validate
    await io.homePage.goToMenu("Resources","Agents");
   let agentselect= '[data-test="displayAgentToken"]'
    await io.flowBuilder.click(agentselect);
    await page.waitForTimeout(5000);
    
    const agentlink =await io.emailVal.getLinkFromEmail(
      "ALERT: API token was displayed in clear text", false, "pwqa1"
    );
    let result=agentlink.toString();
    let validate=false;
      if(result.includes('agent'))
      {
          validate=true
      }
      expect(validate).toBeTruthy();

    //revert email to orginal
    await io.homePage.loadingTime()
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.basePagePO.EDIT_EMAIL_BUTTON)
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_EMAIL)
    console.log("user name: " + process.env.IO_UserName)
    await io.myAccountPage.fill(selectors.basePagePO.NEW_EMAIL, process.env["IO_Password"])
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NEW_PASSWORD)
    await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.CHANGE_EMAIL)
    await io.myAccountPage.click(selectors.basePagePO.CHANGE_EMAIL);
    await io.myAccountPage.waitForElementAttached(selectors.basePagePO.CLOSE_BUTTON)
    await io.myAccountPage.click(selectors.basePagePO.CLOSE_BUTTON);
    // signin of IO and navigate to login page

    
    await page.waitForTimeout(5000);
    const link2 = await io.emailVal.getLinkFromEmail(
      "[qa.staging.integrator.io] Request to change your email", false, "pwqa1"
    );
    console.log("link: " + link2.toString())
    await io.homePage.navigateTo(link2.toString());
    await io.loginPage.fill(selectors.loginPagePO.EMAIL, process.env.IO_UserName);
    await io.loginPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    await io.loginPage.click(selectors.basePagePO.SUBMIT);

  });
});