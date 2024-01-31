
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C45323", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C45323", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.productPortal();
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var status = selectors.basePagePO.PRODUCTPORTAL
    await io.assert.expectToContainValue(status, "Product portal", "");
    await io.homePage.selectTabInHelperMenu("Product Portal");
    await test.step("*** Navigating to product portal ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.REFRESHBUTTON, 4);
    await test.step("*** Sidenav is collapsing   ***",()=>{});
    const portal = await page.locator(selectors.basePagePO.PRODUCT);
    const Productportal = await portal.getAttribute("aria-hidden");
    await await io.assert.expectToBeValue(Productportal, "true", "");
    await test.step("*** Verifying  Product portal  is visible   ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
