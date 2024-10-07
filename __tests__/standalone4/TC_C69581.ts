
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C69581", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C69581 @Env-All @Zephyr-IO-T25937", async ({io,page}, testInfo) => {
    // C69581 Verify Only one Walmart option should be displayed in Applications list
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Click on Create Connectios ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("Walmart");
    const isWalmartOptionVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.WALMART);
    await io.assert.expectToBeTrue(isWalmartOptionVisible, "Walmart option should be displayed in the Applications list");
    await io.homePage.click(selectors.flowBuilderPagePO.WALMART);
    await io.homePage.loadingTime();
    
    const isUsOptionVisible = await io.homePage.isVisible(selectors.connectionsPagePO.WALMART_US_IMAGE);
    await io.assert.expectToBeTrue(isUsOptionVisible, "Walmart US option should be displayed in the Applications list");
    const isCaOptionVisible = await io.homePage.isVisible(selectors.connectionsPagePO.WALMART_CANADA_IMAGE);
    await io.assert.expectToBeTrue(isCaOptionVisible, "Walmart Canada option should be displayed in the Applications list");
    const isMxOptionVisible = await io.homePage.isVisible(selectors.connectionsPagePO.WALMART_MEXICO_IMAGE);
    await io.assert.expectToBeTrue(isMxOptionVisible, "Walmart Mexico option should be displayed in the Applications list");
    test.step("*** Verified Only one  Walmart option should be displayed in the Applications list ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicking on Close ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Click on home Page ***", async ()=>{});
  });
});
