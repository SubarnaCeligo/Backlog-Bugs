import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C27735", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Zephyr-IO-T5131 @Env-All TC_C27735_SSO_Invalid_Issue_URL Issuer URL with invalid string should fail and user should be unable to login", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    const securitytab = io.data.links.MY_ACCOUNT_PAGE_URL.replace('profile', 'security');
    await io.homePage.navigateTo(securitytab);
    await io.homePage.loadingTime();

    const oldSSOButtonVisible = await io.homePage.isVisible(selectors.basePagePO.ENABLESSO);
    if(oldSSOButtonVisible){
      var button = await page.$(selectors.basePagePO.ENABLESSO);
      const isChecked = await button.isChecked();
      if (!isChecked) {
        await io.homePage.click(selectors.basePagePO.ENABLESSO);
      }
    } else {
      var button = await page.$(selectors.myAccountPagePO.DISABLEORENABLE);
      const isChecked = await button.isChecked();
      if (!isChecked) {
        await io.homePage.click(selectors.myAccountPagePO.DISABLEORENABLE);
      }
    }
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.basePagePO.ISSUERURLINPUT, "http://127.0.0.1/");
    await io.homePage.fill(selectors.basePagePO.CLIENTIDINPUT, decrypt("MG9haDlzazRiaFFtNGxaWXkzNTc=")
    );
    await io.homePage.fill(selectors.basePagePO.CLIENTSECRETINPUT, decrypt("XzBETEp6SmR1X2x0SnpOdkNtbUxybHpSNjhEWlZGY1JPY2hzUkg3cg==")
    );
    await io.homePage.fill(selectors.basePagePO.ORGIDPINPUT, "invalid2");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.loadingTime();
  
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL.replace('home', 'sso/invalid2'));
    await io.homePage.loadingTime();
    
    await io.assert.verifyElementContainsText('body', 'The issuer url is invalid.')
  });
});
