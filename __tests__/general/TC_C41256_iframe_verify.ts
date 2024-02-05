
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C41256_Iframe_verify", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Sign up Page ***",()=>{});
  });
  test("TC_C41256_Iframe_verify", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step("*** Navigating to home page ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await test.step("*** clicking on the profile page ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await test.step("*** signingout from page ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.reloadPage();
    // const iframe = await io.assert.checkElementState(selectors.myAccountPagePO.IFRAME,"isVisible")
    // await io.assert.expectToBeTrue(iframe,"")
    // await test.step("*** verifying the iframe  ***",()=>{});
    // await io.signInPage.signInToIO();
    // await test.step("*** signing into IO  ***",()=>{});
    // await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    // await test.step("*** Navigating to home page ***",()=>{});
  });
});
