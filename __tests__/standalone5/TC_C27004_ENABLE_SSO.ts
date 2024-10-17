import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C27004_ENABLE_SSO", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T5092 TC_C27004_ENABLE_SSO", async ({io,page}, testInfo) => {
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
    
    //providing invalid value
    await io.homePage.fill(selectors.basePagePO.ORGIDPINPUT, "12");
    await io.homePage.loadingTime();
    test.step("*** Provided the invalid value ***", async ()=>{});

    //verifying error message
    const errorMsg = await page.locator(selectors.basePagePO.ORGIDVALIDATION).textContent();
    await(await page.locator(selectors.basePagePO.ORGIDVALIDATION)).isVisible();

    await io.assert.expectToBeValue("The Organization Id should be alphanumeric and starting with an alphabet and its length should be between 3 and 20",String(errorMsg).trim(),  "");
  });
});
