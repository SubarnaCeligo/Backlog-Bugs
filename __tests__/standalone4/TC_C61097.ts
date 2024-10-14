
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_Only_SuiteBundle.json";

test.describe("TC_C61097", () => {
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
  test("TC_C61097 @Env-All @Zephyr-IO-T23126", async ({io,page}, testInfo) => {
    // C61097 Verify the prompt displayed when user updates the existing NS step when Selection is already set to Suite App Suite Script 1.0 or 2.x - Edit Lookup
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected Netsuite as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    test.step("*** Clicking on import records ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var conn = TC[0]["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("NETSUITE_WITH_NO_SUITEAPP CONNECTION");
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "NS export");
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE);
    await io.homePage.fill(`${selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE} input`, "Account");
    await io.homePage.clickByText("Account");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORTTYPE);
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_ALL);
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SUITEAPP1POINT0);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    var prom = await io.homePage.getText(selectors.basePagePO.NOTIFICATION_ID);
    await io.assert.expectToContainValue("Install the Integrator.io SuiteApp in your NetSuite account  to integrate with SuiteScript APIs.",String(prom), "");
  });
});
