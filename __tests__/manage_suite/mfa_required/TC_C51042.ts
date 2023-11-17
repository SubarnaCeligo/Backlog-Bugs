import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./mfa.json";



test.describe(`C51042 Verify if the help link on the left side is redirected to MFA article in the help center when the MFA setup is incomplete.`, () => {
  test(`C51042 Verify if the help link on the left side is redirected to MFA article in the help center when the MFA setup is incomplete.`, async ({
    page,
    io
  }) => {
    
    const res = await io.api.putCall(
        `v1/ashares/${process.env.IO_Ashare_ID}`,
        testData
      );
      
     await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL)
     await io.myAccountPage.hover(selectors.basePagePO.ACCOUNT)
     await io.myAccountPage.clickByTextByIndex("Security",0)
     await io.myAccountPage.click(selectors.myAccountPagePO.HELP_TEXT)
     const expectedUrl = "https://docs.celigo.com/hc/en-us/articles/7127009384987-Set-up-multifactor-authentication-MFA-for-your-account";
     const anchor = await page.locator('a:has-text("Learn more")').nth(0);
     const hrefAttribute = await anchor.getAttribute('href');
     await io.assert.expectToBeValue(expectedUrl,hrefAttribute,"link doesn,t match")
  });
});

 
 
 
 


 

 
 