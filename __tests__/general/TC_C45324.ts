import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";


test.describe("TC_C45324", () => {
  test.beforeEach(async ({ io }) => {
    await test.step("*** Navigate to Home Page ***", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T3168 @Env-All  TC_C45324", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.selectTabInHelperMenu("Product portal");
    await test.step("*** Navigating to product portal ***", () => { });
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    let iframe = selectors.myAccountPagePO.IFRAME;
    await io.assert.verifyElementAttributeContainsText(iframe, "src", "https://portal.productboard.com/wcpkv3awtdpkze4x7wwbpog7")
    await test.step("*** Verified  iframe inside IO and the iframe should be https://portal.productboard.com/wcpkv3awtdpkze4x7wwbpog7 ***", () => { });
    const breadcrumbs = await io.homePage.getText(selectors.basePagePO.BREADCRUMB);
    await io.assert.expectToBeValue(String(breadcrumbs), "HomeProduct portal", "");
    await test.step("*** Verifying the Breadcrumbs as Home > Product ***", () => { });
  });
});