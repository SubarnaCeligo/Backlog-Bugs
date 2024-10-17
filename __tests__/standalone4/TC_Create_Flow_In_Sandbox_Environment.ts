
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/Flows/create/salesforce/Create_Flow_In_Sandbox_Environment.json"

test.describe("C2406_Create_Flow_In_Sandbox_Environment", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** End of Test Suite ***", async ()=>{});
    const isCloseButtonVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    if (isCloseButtonVisible) {
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
      await io.homePage.loadingTime();
    }

    const isCloseRightDrawerVisible = await io.homePage.isVisible(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    if (isCloseRightDrawerVisible) {
      await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
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
    test.step("Flow Deleted Successfully", async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
  });
  test("C2406_Create_Flow_In_Sandbox_Environment @Env-All @Zephyr-IO-T8099", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime()
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Clicking on type of export ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var conn = SF["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("NETSUITE CONNECTION SANDBOX");
    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "AutomationStandalone_NS_itemlocconfig_verify");
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    await io.homePage.loadingTime();
    test.step("*** Refreshing the RecordType of NETSUITE ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE);
    await io.homePage.fill(`${selectors.flowBuilderPagePO.EXPORT_RECORD_TYPE} input`, "Custome");
    await io.homePage.clickByText("Customer");
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 1);
    test.step("*** Selecting the desired saved search ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORTTYPE);
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_ALL);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    // *Create Page Processors
    test.step("*** Creating PageProcessor ***", async ()=>{});
    await io.pageProcessor( "Allure",SF);

    const FlowSettings = await page.locator(
      selectors.basePagePO.FLOWSETTING
    );
    await FlowSettings.isVisible();
    await FlowSettings.click();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Create_Flow_In_Sandbox_Environment");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Flow Created in sandbox ***", async ()=>{});
    const url = await io.homePage.getCurrentUrl();
    const urlPaths = url.split("/");
    var flowId = urlPaths[urlPaths.length - 1];
    var flowStatus = await io.api.getFlowById(  flowId);

    await io.assert.expectToBeValue(String(flowStatus.name), "Create_Flow_In_Sandbox_Environment", "");
  });
});
