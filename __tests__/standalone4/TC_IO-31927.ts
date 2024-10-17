
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/IO-31927.json";
import Connection from "@testData/STANDALONE/suiteApp.json";

test.describe("IO-31927", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
   
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    const isCloseRightDrawerButtonVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    if (isCloseRightDrawerButtonVisible) {
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
      await io.homePage.loadingTime();
    }

    const isCloseButtonVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    if (isCloseButtonVisible) {
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
      await io.homePage.loadingTime();
      const isDiscardButtonVisible = await io.homePage.isVisible(selectors.basePagePO.DISCARD_CHANGES);
      if (isDiscardButtonVisible) {
        await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.homePage.loadingTime();
      }
    }

    const openActionsMenu = await page.$$(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    const isActionsClickable = await openActionsMenu[0].isEnabled();
    if (isActionsClickable) {
      await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
      await io.homePage.click(selectors.flowBuilderPagePO.DELETE_FLOW);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
      await io.homePage.loadingTime();
    }

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C61075");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Navigate to Home Page ***", async () => { });
    const openActionsMenu2 = await page.$$(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    const isActionsClickable2 = await openActionsMenu2[0].isEnabled();
    if (isActionsClickable2) {
      await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
      await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.basePagePO.DELETE);
      await io.homePage.loadingTime();
    }
  });
  test("IO-31927 @Env-All @Zephyr-IO-T8123", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** selecting Netsuite ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var connection = Connection[0]["qaprod__connectionId_bothSuiteAppSuiteBundleInstalled"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, connection);
    await io.homePage.clickByText(connection);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    await io.homePage.click(selectors.flowBuilderPagePO.SUITEAPP1POINT0);
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C61075");
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE);
    await io.homePage.fill(`${selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE} input`, "Account");
    await io.homePage.clickByText("Account");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** select Suiteapp1.0 option ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH, "4646");
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.EXPORTTYPE, "all");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** test.afterEach saving again opening that export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DATATEST);
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_README);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await io.exportsPage.fill("#data textarea", JSON.stringify(NS));
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.myAccountPagePO.NUMFIELD, 0);
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.DATATEST);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.NAMENUMFIELD, "value", "0");
    test.step("*** validated that 0 is saved ***", async ()=>{});
  });
});
