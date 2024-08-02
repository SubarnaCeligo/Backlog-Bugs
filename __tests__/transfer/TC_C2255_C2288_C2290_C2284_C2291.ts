import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./transfer.json";
import testData2 from "./transfer2.json";
import { decrypt } from "@celigo/aut-utilities";

test.describe(`C2255_C2288_C2290_C2284_C2289_C2291_C2445 Transfer Account Ownership between users`, () => {
  test(`@Env-QA @Env-STAGING @Zephyr-IO-T6930 C2255_C2288_C2290_C2284_C2289_C2291_C2445 Transfer Account Ownership between users`, async ({ io }) => {
    const res = await io.api.postCall(`v1/transfers/invite`, testData);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.reloadPage();
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, 'sushant.bhosle+1@celigo.com');
    await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt('IyUhaVo1N0UkY3V3QU9mIQ=='));
    await io.myAccountPage.loadingTime()
    await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
    await io.myAccountPage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.basePagePO.NOTIFICATION_ARIA_LABEL);
    await io.myAccountPage.loadingTime()
    await io.homePage.click(selectors.basePagePO.NOTIFICATION_ARIA_LABEL)
    await io.homePage.click(selectors.basePagePO.ACCEPT_INVITE)
    await io.homePage.reloadPage();
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_SELECTOR)
    await io.homePage.clickByIndex(selectors.basePagePO.ACCOUNT_SELECTOR, 1)
    //C2255  Transfer Account Ownership between users
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.SUBSCRIPTION, "Acount ownership is not transferred successfully")
    // C2445 Verify the newly signed up user is able to access integration tiles/whole account once he accepts the account ownership.(without navigating to profile page)
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.AUDIT_LOG, "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.USERS, "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.TRANSFERTAB, "Acount ownership is not transferred successfully")
    //C2288 Fields to be verified: After the account transfer is done, the following fields should be intact in both user accounts. fields: name, email, password, role, phone, time zone, developer, sign in with google id and email.
    await io.homePage.click(selectors.myAccountPagePO.PROFILE)
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.PHONEFIELD, "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.FORNAME, "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.FORPASSWORD, "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.FORCOMPANY, "Acount ownership is not transferred successfully")
    //C2290 Verify that company field: The value for the company field will be taken from the old owner irrespective of the new owner has, after the account transfer both users will have same value for company that is the value of old owner.
    const roleText1 = await io.myAccountPage.getText(selectors.myAccountPagePO.FORCOMPANY)
    await io.assert.expectToBeValue(roleText1.toString(), "Company *", "company field is not same as old owner")
    //C2289 Verify that company field:If the old owner doesn't have any value for this field then both users will not have any value for this field after account transfer.
    const roleText = await io.myAccountPage.getText(selectors.myAccountPagePO.ROLEFIELD)
    await io.assert.expectToBeValue(roleText.toString(), "", " field value is not empty")
    //C2284 Verify1) Account transfer is only allowed between users of same organisation 2) The user to whom the account is being transfer should not be part of multiple organisations
    await io.homePage.click(selectors.myAccountPagePO.USERS)
    const locator1 = await io.homePage.isVisible('text="Owner"');
    await io.assert.expectToBeValue(locator1.toString(), 'true', "Owner is not displayed")
    //C2291 Verify below after account transfer:1. Once the account transfer is done, the old owner should have account level manage access2.
    const locator = await io.homePage.isVisible('text="Manage all"');
    await io.assert.expectToBeValue(locator.toString(), 'true', "Manage all is not displayed")
    const res2 = await io.api.postCall(`v1/transfers/invite`,testData2);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_SELECTOR)
    await io.homePage.clickByIndex(selectors.basePagePO.ACCOUNT_SELECTOR, 1)
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TYPEEMAIL);
    await io.homePage.click(selectors.basePagePO.TYPEEMAIL)
    await io.homePage.fill(selectors.basePagePO.TYPEEMAIL, "io.auto.qa@celigo.com")
    await io.homePage.waitForElementAttached(selectors.basePagePO.PASSWORDPLACEHOLDER);
    await io.homePage.click(selectors.basePagePO.PASSWORDPLACEHOLDER)
    await io.homePage.fill(selectors.basePagePO.PASSWORDPLACEHOLDER, decrypt("Z3BnYmpNUHVLMGxMd0ZY"));
    await io.homePage.click(selectors.basePagePO.SUBMIT)
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_SELECTOR)
    await io.homePage.clickByIndex(selectors.basePagePO.ACCOUNT_SELECTOR, 1)
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.basePagePO.NOTIFICATION_ARIA_LABEL)
    await io.myAccountPage.loadingTime()
    await io.homePage.click(selectors.basePagePO.NOTIFICATION_ARIA_LABEL)
    await io.homePage.click(selectors.basePagePO.ACCEPT_INVITE)
    await io.homePage.reloadPage();
  });
});
