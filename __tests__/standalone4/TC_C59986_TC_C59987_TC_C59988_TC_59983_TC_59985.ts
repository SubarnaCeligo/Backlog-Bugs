
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DPtrue from "@testData/STANDALONE/Devplaygroundtrueflag.json";
import DPfalse from "@testData/STANDALONE/Devplagroundfalseflag.json";

test.describe("TC_C59986_TC_C59987_TC_C59988_TC_59983_TC_59985", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    const tiles = await io.api.getCall("v1/tiles");
    if (!tiles) {
      return;
    }
    for (let tile of tiles) {
      if (tile.name.includes("Devplayground")) {
        await io.api.deleteCall(`v1/integrations/${tile._integrationId}`);
      }
    }
  });
  test("TC_C59986_TC_C59987_TC_C59988_TC_59983_TC_59985 @Env-All @Zephyr-IO-T22988 @Zephyr-IO-T22989 @Zephyr-IO-T22990 @Zephyr-IO-T22985 @Zephyr-IO-T22987", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    test.step("*** Clicked on Production Env. ***", async ()=>{});

    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Devplayground");
    test.step("*** Entered Integration Name ***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on SAVE and CLOSE button ***", async ()=>{});
    await io.homePage.loadingTime();

    const isCreateFlowButtonVisible = await io.homePage.isVisible(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.assert.expectToBeTrue(isCreateFlowButtonVisible, "Create flow now button is not visible");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SETTINGS);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Entering the data in the Json form data ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    let flagastrue = DPtrue["Mockdata"];
    let platform = process.platform;

    if(platform.toUpperCase().indexOf("DARWIN") > -1) {
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
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, JSON.stringify(flagastrue));
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var requriedwhenAll = await io.homePage.isVisible(selectors.playgroundPO.REQUIREDWHENALL);
    await io.assert.expectToBeTrue(requriedwhenAll, "");

    await io.assert.verifyElementContainsText(selectors.playgroundPO.REQUIREDWHENALL_LABEL, "*");
    await io.assert.verifyElementContainsText(selectors.playgroundPO.REQUIREDWHEN_LABEL, "*");

    await io.homePage.click(selectors.playgroundPO.UPDATE_OPTION);
    await io.homePage.loadingTime();

    const requriedwhenALL = await page.locator(selectors.playgroundPO.REQUIREDWHENALL_LABEL).textContent();
    const isRequiredWhenAllRequired = requriedwhenALL.includes("*");
    await io.assert.expectToBeFalse(isRequiredWhenAllRequired, "");

    const requriedwhen = await page.locator(selectors.playgroundPO.REQUIREDWHEN_LABEL).textContent();
    const isRequiredWhenRequired = requriedwhen.includes("*");
    await io.assert.expectToBeFalse(isRequiredWhenRequired, "");

    await io.assert.verifyElementContainsText(selectors.playgroundPO.DEFAULTREQUIRED_LABEL, "*");
    var defaultvisible = await io.homePage.isVisible(selectors.playgroundPO.DEFAULTVISIBLE);
    await io.assert.expectToBeTrue(defaultvisible, "");
    await io.assert.checkElementState(selectors.playgroundPO.DEFAULTDISABLED, "isDisabled");

    test.step("*** Entering the data in the Json form data ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    let flagasfalse = DPfalse["Mockdata"];

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
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, JSON.stringify(flagasfalse));
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.LAUNCH_EDITOR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.playgroundPO.SELECT);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.selectDropdownBasedOnAttribute(selectors.basePagePO.MENU_ITEM, "India");

    await io.homePage.loadingTime();
    const requriedwhen2 = await page.locator(selectors.playgroundPO.REQUIREDWHEN_LABEL).textContent();
    const isRequiredWhenRequired2 = requriedwhen2.includes("*");
    await io.assert.expectToBeTrue(isRequiredWhenRequired2, "");

    const defaultRequired = await page.locator(selectors.playgroundPO.DEFAULTREQUIRED_LABEL).textContent();
    const isDefaultRequired = defaultRequired.includes("*");
    await io.assert.expectToBeFalse(isDefaultRequired, "");

    var defaultVisible = await io.homePage.isVisible(selectors.playgroundPO.DEFAULTVISIBLE);
    await io.assert.expectToBeFalse(defaultVisible, "");
    await io.assert.checkElementState(selectors.playgroundPO.DEFAULTDISABLED, "isEnabled");

    test.step("Navigating to Homepage", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
