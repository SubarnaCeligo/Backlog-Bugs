import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C45323", () => {
  test.beforeEach(async ({io}) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T3167 @Env-All TC_C45323", async ({io,page}, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.selectTabInHelperMenu("Product portal");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    const heading = await io.homePage.isVisible('text="Product portal"')
    await io.assert.expectToBeValue(heading.toString(), 'true', "") 
    await test.step("*** Verified Title is displayed ***",()=>{});
    await io.homePage.selectTabInHelperMenu("Product portal");
    await test.step("*** Navigating to product portal ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.myAccountPagePO.REFRESHBUTTON, 4);
    await test.step("*** Sidenav is collapsing   ***",()=>{});
    const portal = await page.locator(selectors.basePagePO.PRODUCTPORTAL).isVisible();
    await await io.assert.expectToBeTrue(portal, "");
    await test.step("*** Verifying  Product portal  is visible   ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
