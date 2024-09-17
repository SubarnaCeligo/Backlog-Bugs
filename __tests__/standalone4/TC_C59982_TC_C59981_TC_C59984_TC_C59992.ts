import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C59982_TC_C59981_TC_C59984_TC_C59992", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
  test("TC_C59982_TC_C59981_TC_C59984_TC_C59992 @Env-All @Zephyr-IO-T22984 @Zephyr-IO-T22893 @Zephyr-IO-T22986 @Zephyr-IO-T22994", async ({ io, page }, testInfo) => {
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
    var visblewhenall = await io.homePage.isVisible(selectors.playgroundPO.VISBLEWHENALL);
    await io.assert.expectToBeTrue(visblewhenall, "");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var visblewhen = await io.homePage.isVisible(selectors.playgroundPO.VISBLEWHEN);
    await io.assert.expectToBeTrue(visblewhen, "");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.assert.checkElementState(selectors.playgroundPO.DISABLEWHEN, "isDisabled");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.assert.checkElementState(selectors.playgroundPO.DISABLEWHENALL, "isDisabled");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.UPDATE_OPTION);
    
    var visblewhenall = await io.homePage.isVisible(selectors.playgroundPO.VISBLEWHENALL);
    await io.assert.expectToBeFalse(visblewhenall, "");
    var visblewhen = await io.homePage.isVisible(selectors.playgroundPO.VISBLEWHEN);
    await io.assert.expectToBeFalse(visblewhen, "");
    var disableWhen = await io.homePage.isVisible(selectors.playgroundPO.DISABLEWHEN);
    await io.assert.expectToBeTrue(disableWhen, "");
    var disableWhenAll = await io.homePage.isVisible(selectors.playgroundPO.DISABLEWHEN);
    await io.assert.expectToBeTrue(disableWhenAll, "");
    
    await io.assert.checkElementState(selectors.playgroundPO.DISABLEWHENALL, "isEnabled");
    await io.assert.checkElementState(selectors.playgroundPO.DISABLEWHEN, "isEnabled")
    
    await io.homePage.click("[id='in']");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.playgroundPO.SELECT);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.selectDropdownBasedOnAttribute(selectors.basePagePO.MENU_ITEM, "Canada");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
   
    await io.assert.checkElementState(selectors.playgroundPO.VISBLEWHENALL,"isDisabled")

    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var visbleWhen = await io.homePage.isVisible(selectors.playgroundPO.VISBLEWHEN);
    await io.assert.expectToBeFalse(visbleWhen, "");

    await io.homePage.click(selectors.playgroundPO.TESTFORM);
    await io.homePage.loadingTime();

    await io.assert.verifyElementContainsText(selectors.playgroundPO.FORM_OUTPUT, "visibleWhen");
    await io.assert.verifyElementContainsText(selectors.playgroundPO.FORM_OUTPUT, "visibleWhenAll");
    await io.assert.verifyElementContainsText(selectors.playgroundPO.FORM_OUTPUT, "disabledWhen");
    await io.assert.verifyElementContainsText(selectors.playgroundPO.FORM_OUTPUT, "disabledWhenAll");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
