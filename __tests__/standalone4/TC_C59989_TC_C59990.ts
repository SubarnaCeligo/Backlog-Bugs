
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DPtrue from "@testData/STANDALONE/Devplaygroundtrueflag.json";
import DPfalse from "@testData/STANDALONE/Devplagroundfalseflag.json";

test.describe("TC_C59989_TC_C59990", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C59989_TC_C59990 @Env-All @Zephyr-IO_T22991 @Zephyr-IO-T22992", async ({io,page}, testInfo) => {
    // C59989 Verify the devplayground for the condition touched
    // C59990 Verify the devplayground for the condition omitWhenHidden
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

    test.step("*** Entering the data in the Json form data ***", async () => { });
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    var flagastrue = DPtrue.Mockdata;
    let platform = process.platform;

    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await page.keyboard.down("Meta");
      await page.keyboard.press("A");
      await page.keyboard.up("Meta");

      await page.keyboard.down("Meta");
      await page.keyboard.press("x");
      await page.keyboard.up("Meta");
    } else {
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");

      await page.keyboard.down("Control");
      await page.keyboard.press("x");
      await page.keyboard.up("Control");
    }
    await io.exportsPage.fill("#data textarea", JSON.stringify(flagastrue));
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.assert.verifyElementToBeClickable(selectors.playgroundPO.TESTFORM);

    var visblewhenall = await io.homePage.isVisible(selectors.playgroundPO.VISBLEWHENALL);
    await io.assert.expectToBeTrue(visblewhenall, "");
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var status = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue('"visibleWhenAll": "Hyderabad"',String(status), "");
    test.step("Verified Visiblewhenall is displaying in preview data for omitwhenhidden true and with matching condition", async ()=>{});
    
    await io.homePage.click(selectors.playgroundPO.UPDATE_OPTION);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var status2 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);

    await io.assert.expectNotToContainValue('"visibleWhenAll": "Hyderabad"',String(status2),"")
   
    await io.assert.expectToContainValue('"visibleWhen": "Hyderabad"',String(status), "");
    
    let flagasfalse = DPfalse["Mockdata"];

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    if (platform.toUpperCase().indexOf("DARWIN") > -1) {
      await page.keyboard.down("Meta");
      await page.keyboard.press("A");
      await page.keyboard.up("Meta");

      await page.keyboard.down("Meta");
      await page.keyboard.press("x");
      await page.keyboard.up("Meta");
    } else {
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");

      await page.keyboard.down("Control");
      await page.keyboard.press("x");
      await page.keyboard.up("Control");
    }
    await io.exportsPage.fill("#data textarea", JSON.stringify(flagasfalse));
    await io.assert.verifyElementNotToBeClickable(selectors.playgroundPO.TESTFORM);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
