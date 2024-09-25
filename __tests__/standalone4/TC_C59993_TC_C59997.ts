
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DP from "@testData/STANDALONE/Devplayground_datetime.json";

test.describe("TC_C59993_TC_C59997", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C59993_TC_C59997 @Env-All @Zephyr-IO-T22995 @Zephyr-IO-T22999", async ({io,page}, testInfo) => {
    // C59993 Verify the devplayground for the datetime settings
    // C59997 Verify the devplayground for the keyValue with different combinations
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Playground");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Form builder");
    await io.homePage.clickButtonBasedOnLabelName(selectors.playgroundPO.LIST_OF_ITEM_OPTIONS, "Field dictionary");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.FULLSCREEN_MODE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Entering the data in the Json form data ***", async ()=>{});
    await io.homePage.loadingTime();
    let datetime = DP["Mockdata"];
    const textarea = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    if (textarea) {
      await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);

      // Select all text and delete it
      await io.homePage.loadingTime();
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Meta+A');
      await page.keyboard.press('Backspace');
    }
    await io.exportsPage.fill("#data textarea", JSON.stringify(datetime));
    
    await io.homePage.loadingTime();
    var Key0 = await io.homePage.isVisible(selectors.playgroundPO.KEY0);
    await io.assert.expectToBeTrue(Key0, "");
    await io.homePage.click(selectors.playgroundPO.KEY0);
    
    await io.homePage.fill(selectors.playgroundPO.KEY0_INPUT, "String");
    await io.homePage.loadingTime();
    test.step("*** Entering the destination field in Key ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.VALUE0);
    await io.homePage.fill(selectors.playgroundPO.VALUE0_INPUT, "Test");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.KEY1);
    await io.homePage.fill(selectors.playgroundPO.KEY1_INPUT, "Number");
    await io.homePage.loadingTime();
    test.step("*** Entering the destination field in Key ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.VALUE1);
    await io.homePage.fill(selectors.playgroundPO.VALUE1_INPUT, "23");
    await io.homePage.loadingTime();
    test.step("*** Entering the source field in static ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.loadingTime();
    var status = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue('"theKey": "String"',String(status), "");
    await io.assert.expectToContainValue('"theValue": "Test"', String(status), "");
    await io.assert.expectToContainValue('"theKey": "Number"', String(status), "");
    await io.assert.expectToContainValue('"theValue": "23"', String(status), "");

    test.step("*** Verified Key value with Number and string combination ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.DATE_TIME_FIELD);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.playgroundPO.CALENDER_ICON, 0);
    await io.homePage.loadingTime();
    
    var timetext = await io.homePage.isVisible(selectors.playgroundPO.TIME_FIELD);
    await io.assert.expectToBeTrue(timetext, "");

    var calender = await io.homePage.isVisible(selectors.playgroundPO.SUNDAY_COLUMN);
    await io.assert.expectToBeTrue(calender, "");

    var Json = await page.locator(selectors.flowGroupingPagePO.JSONEDITOR);
    await Json.dblclick();

    await io.homePage.click(selectors.playgroundPO.DATE_FIELD);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.playgroundPO.CALENDER_ICON, 1);
    await io.homePage.loadingTime();
    
    await io.homePage.click("[aria-current='date']");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
