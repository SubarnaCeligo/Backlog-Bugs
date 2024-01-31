
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C45324", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C45324", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.productPortal();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.selectTabInHelperMenu("Product Portal");
    await test.step("*** Navigating to product portal ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    let iframe = selectors.myAccountPagePO.IFRAME;
    await io.assert.verifyElementAttribute(iframe,"src","https://portal.productboard.com/wcpkv3awtdpkze4x7wwbpog7")
    await test.step("*** Verified  ifram inside IO and the iframe should be https://portal.productboard.com/wcpkv3awtdpkze4x7wwbpog7 ***",()=>{});
    const breadcrumbs = await io.homePage.getText(selectors.basePagePO.BREADCRUMB);
    await io.assert.expectToBeValue(String(breadcrumbs), "Home > Product portal", "");
    await test.step("*** Verifying the Breadcrumbs as Home > Product ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
