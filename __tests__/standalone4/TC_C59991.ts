
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import omit from "@testData/STANDALONE/TC_C59991.json";

test.describe("TC_C59991", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C59991 @Env-All @Zephyr-IO-T22993 Verify the devplayground for the condition omitWhenValueIs", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Form builder");
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Conditional field dictionary");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.FULLSCREEN_MODE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Entering the data in the Json form data ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

    let omitwhen = omit["Mockdata"];
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
    await io.exportsPage.fill("#data textarea", JSON.stringify(omitwhen));
    
    var omitwhenvalueis = await io.homePage.isVisible(selectors.playgroundPO.OMITWHENVALUEIS);
    await io.assert.expectToBeTrue(omitwhenvalueis, "");
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var status = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectNotToContainValue('"omitWhenValueIs"',String(status),"")
    test.step("*** Verified OmitwhenValueis when value is matching with select value  ***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.playgroundPO.OMITWHENVALUEIS, "Chennai");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var status2 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue('"omitWhenValueIs"',String(status2), "");
    test.step("*** Verified OmitwhenValueis when value is not matching with select value  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
