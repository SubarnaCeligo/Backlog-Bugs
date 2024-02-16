import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./transfer.json";
import testData2 from "./transfer2.json";

test.describe(`C2255_C2288_C2290_C2284_C2289_C2291_C2445 Transfer Account Ownership between users`, () => {

   
  test(` Transfer Account Ownership between users`, async ({
    page,
    io
  }) => {
    const res = await io.api.postCall(
      `v1/transfers/invite`,
      testData,
       
    );
    console.log(res,"res")
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.reload();
    await io.homePage.click('[aria-label="notifications"]')
    await io.homePage.click('[data-test="accept transfer share"]')
    await page.reload();
    await io.homePage.waitForElementAttached('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall')
    await io.homePage.clickByIndex('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall',1)
    //C2255  Transfer Account Ownership between users
    await io.assert.verifyElementIsDisplayed('[data-test="Subscription"]', "Acount ownership is not transferred successfully")

    // C2445 Verify the newly signed up user is able to access integration tiles/whole account once he accepts the account ownership.(without navigating to profile page)
    await io.assert.verifyElementIsDisplayed('[data-test="Audit log"]', "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed('[data-test="Users"]', "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed('[data-test="Transfers"]', "Acount ownership is not transferred successfully")
    
   //C2288 Fields to be verified: After the account transfer is done, the following fields should be intact in both user accounts. fields: name, email, password, role, phone, time zone, developer, sign in with google id and email.
    await io.homePage.click('[data-test="Profile"]')
    await io.assert.verifyElementIsDisplayed('[for="phone"]', "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed('[for="name"]', "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed('[for="password"]', "Acount ownership is not transferred successfully")
    await io.assert.verifyElementIsDisplayed('[for="company"]', "Acount ownership is not transferred successfully")
    //C2290 Verify that company field: The value for the company field will be taken from the old owner irrespective of the new owner has, after the account transfer both users will have same value for company that is the value of old owner.
    const roleText1 = await io.myAccountPage.getText('[for="company"]')
    await io.assert.expectToBeValue(roleText1.toString(),"Company *","company field is not same as old owner")


    //C2289 Verify that company field:If the old owner doesn't have any value for this field then both users will not have any value for this field after account transfer.
    const roleText = await io.myAccountPage.getText('[name="role"]')
    await expect(roleText).toBe("");

    //C2284 Verify1) Account transfer is only allowed between users of same organisation 2) The user to whom the account is being transfer should not be part of multiple organisations
    await io.homePage.click('[data-test="Users"]')


      const locator1 = await io.homePage.isVisible('text="Owner"');
      await io.assert.expectToBeValue(locator1.toString(),'true', "Owner is not displayed")

      //C2291 Verify below after account transfer:1. Once the account transfer is done, the old owner should have account level manage access2.

      const locator = await io.homePage.isVisible('text="Manage all"');
      await io.assert.expectToBeValue(locator.toString(),'true', "Manage all is not displayed")



    const res2 = await io.api.postCall(
      `v1/transfers/invite`,
      testData2,
       
    );

 await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall')
      await io.homePage.clickByIndex('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall',1)
      await io.homePage.click('[data-test="signOut"]');
      await io.homePage.waitForElementAttached('[type= "Email"]');
      await io.homePage.click('[type= "Email"]')
      await io.homePage.fill('[type= "Email"]', "sai.phanindra.godavarthi+owner@celigo.com")
      await io.homePage.waitForElementAttached('[placeholder="Password*"]');
      await io.homePage.click('[placeholder="Password*"]')
      await io.homePage.fill('[placeholder="Password*"]', "$vH9nO&mEY1r!RHd");
      await io.homePage.click('[data-test="submit"]')


      await io.homePage.waitForElementAttached('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall')
      await io.homePage.clickByIndex('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit.MuiIconButton-sizeSmall',1)

      


     
     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL); 
      await io.homePage.waitForElementAttached('[aria-label="notifications"]')
      await io.homePage.click('[aria-label="notifications"]')
    await io.homePage.click('[data-test="accept transfer share"]')
    await page.reload();
  });
});
