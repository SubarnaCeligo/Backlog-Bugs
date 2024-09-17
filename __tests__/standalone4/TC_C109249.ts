import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C109249", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("TC_C109249 @Zephyr-IO-T23728 @Env-All", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    test.step("***  Clicked on Marketplace button  ***", async ()=>{});
    await io.homePage.loadingTime();
    // The help link should be shown in blue color
    const linkColor = await page
      .locator(selectors.marketplacePagePO.MARKETPLACE_DOC_LINK)
      .evaluate(el => {
        return getComputedStyle(el).color;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      linkColor,
      "Field outline (export) background color is not blue"
    );

    test.step("*** Verifying the The help link should be shown in blue color ***", async ()=>{});
    await io.homePage.loadingTime();

    // The button should show as BLUE in color
    await io.homePage.clickButtonByIndex("[role='button'] .MuiListItemIcon-root", 1);
    
    test.step("*** Clicking on By Type dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.marketplacePagePO.BY_TYPE_TEMPLATE_OPTION);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.homePagePO.INSTALL_TEMPLATE, 1);
    test.step("*** Clicking on install template ***", async ()=>{});
    await io.homePage.loadingTime();
    const installButtonColor = await page
      .getByText("Install now")
      .evaluate(el => {
        return getComputedStyle(el).backgroundColor;
      });
    await io.assert.expectToBeValue(
      "rgb(29, 118, 199)",
      installButtonColor,
      "Field outline (export) background color is not blue"
    );
    test.step("*** Verified The button should show as BLUE in color  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** Clicking on the close drawer ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
