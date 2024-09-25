
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DP from "@testData/STANDALONE/TC_C59996.json";

test.describe("TC_C59996", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C59996 @Env-All @Zephyt-IO-T22998 Verify the devplayground for the staticMap with different combinations", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Form builder");
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Dynamic field dictionary");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.FULLSCREEN_MODE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    test.step("*** Entering the data in the Json form data ***", async ()=>{});
    await io.homePage.loadingTime();
    let Staticlookup = DP["Mockdata"];
    const textarea = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    if (textarea) {
      await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

      // Select all text and delete it
      await io.homePage.loadingTime();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
    }
    await io.homePage.loadingTime();
    await io.exportsPage.fill("#data textarea", JSON.stringify(Staticlookup));
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    
    var data1 = await io.homePage.isVisible(selectors.mappings.STATICLOOKUPIMPORT);
    await io.assert.expectToBeTrue(data1, "");
    await io.homePage.click(selectors.mappings.STATICLOOKUPIMPORT);
    
    await io.homePage.fillWebPage(selectors.mappings.STATICLOOKUPIMPORT, "Destination");
    test.step("*** Entering the destination field in static ***", async ()=>{});
    await io.homePage.click(selectors.mappings.STATICLOOKUPEXPORT);
    await io.homePage.fillWebPage(selectors.mappings.STATICLOOKUPEXPORT, "Source");
    test.step("*** Entering the source field in static ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    var status = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    console.log(status);
    await io.assert.expectToContainValue('"Destination',String(status), "");
    await io.assert.expectToContainValue('"Source',String(status), "");

    test.step("*** Verified Static look ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
