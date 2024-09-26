
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DP from "@testData/STANDALONE/TC_C59998.json";

test.describe("TC_C59998_TC_C59994_TC_C59995", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C59998_TC_C59994_TC_C59995 @Env-All @Zephyr-IO-T23000 @Zephyr-IO-T22996 @Zephyr-IO-T22997", async ({io,page}, testInfo) => {
    // C59998 Verify the devplayground for the netsuitelookup
    // C59994 Verify the devplayground for the exportSelect settings
    // C59995 Verify the devplayground for the refreshableSelect settings
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
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    let NSlookup = DP["Mockdata"];
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
    await io.exportsPage.fill("#data textarea", JSON.stringify(NSlookup));
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    
    var Netsuitelookup = await io.homePage.isVisible(selectors.playgroundPO.NSLOOKUP);
    await io.assert.expectToBeTrue(Netsuitelookup, "");
    test.step("*** Verified Netsuite look up filter is displaying***", async ()=>{});

    await io.homePage.click(selectors.playgroundPO.REFRESHABLESELECT);
    await io.homePage.click("//span[text()='Pick-up at store']");
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    var refreshableselect = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);

    await io.assert.expectToContainValue('"refreshableselect": "2"',String(refreshableselect), "");
    test.step("*** Verified refreshableselect ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.EXPORTMULTISELECT);
    await io.homePage.click("//span[text()='Pick-up at store']");
    await io.homePage.click("//span[text()='Truck']");
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT);
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    var exportMultiSelect = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);

    await io.assert.expectToContainValue('"exportMultiSelect": [    "2",    "3"  ]',String(exportMultiSelect), "");

    test.step("*** Verified Multiselect ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
