
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26309 Security Breadcrumbs Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5022 @Env-All C26309 Verify Field Names, Breadcrumbs in Security Tab", async ({io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Menu ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.SECURITY);

    const oldSSOButtonVisible = await io.homePage.isVisible(selectors.basePagePO.ENABLESSO);
    console.log({ oldSSOButtonVisible })
    if(oldSSOButtonVisible){
      await io.homePage.click(selectors.basePagePO.ENABLESSO);
    } else {
      await io.homePage.click(selectors.myAccountPagePO.DISABLEORENABLE);
    }
    
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.FOR_ISSUERURL, "Issuer URL *");
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.FOR_CLIENTID, "Client ID *");
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.FOR_CLIENTSECRET, "Client secret *");
    await io.assert.verifyElementContainsText(selectors.connectionsPagePO.FOR_ORGID, "Organization ID *");
  });
});
