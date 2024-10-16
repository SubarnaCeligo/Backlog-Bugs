
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C61091_TC_C102909", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    const isCloseButtonVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    if (isCloseButtonVisible) {
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
      await io.homePage.loadingTime();
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
  });
  test("TC_C61091_TC_C102909 @Env-All @Zephyr-IO-T23122 @Zephyr-IO-T24532", async ({io,page}, testInfo) => {
    // C61091 Verify the prompt displayed when user updates the existing NS step when Selection is already set to Suite App Suite Script 1.0 or 2.x - Edit Import
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected Netsuite as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Clicking on import records ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let conn = "NETSUITE CONNECTION";
    
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("NETSUITE CONNECTION");
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "NS Import");

    //TC_C102909-Verify autocomplete in dropdowns for existing NS import
    await io.homePage.click(selectors.flowBuilderPagePO.RECORD_TYPE);
    await io.homePage.fill(`${selectors.flowBuilderPagePO.RECORD_TYPE} input`, "Account");
    await io.homePage.clickByText("Account");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_RADIO_BUTTON);
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SUITEAPP1POINT0);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    const promp = await io.homePage.isVisible(selectors.basePagePO.NOTIFICATION_ID);
    await io.assert.expectToBeFalse(promp, "");
  });
});
