
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC4 from "@testData/EM2.0/TC_C2256_C2248_ActionDropDown_AuditLog_Window_Close.json";

test.describe("TC_C2256_C2248_C2038_ActionDropDown_AuditLog_Window_Close", () => {

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2018 @Zephyr-IO-T2017 @Zephyr-IO-T2006 TC_C2256_C2248_C2038_ActionDropDown_AuditLog_Window_Close", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows4 = await io.api.createImpOrExpAndFlowsThruAPI(TC4);
await test.step(
      "*** Created Flows :" + flows4.get(TC4.name)["flowName"]
, async ()=>{});
    test.step("*** Flow created ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C2256_C2248_ActionDropDown_AuditLog_Window_Close"
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    test.step("*** Click on Flow Action Drop Down ***", async ()=>{});
    var editflow = await io.homePage.getText(
      "[data-test='editFlow']"
    );
    var auditlogs = await io.homePage.getText(
      selectors.basePagePO.AUDITLOG
    );
    var usedby = await io.homePage.getText(
      selectors.basePagePO.USEDBY
    );
    var downloadflow = await io.homePage.getText(
      selectors.basePagePO.DOWNLOADFLOWGROUPING
    );
    var cloneflow = await io.homePage.getText(
      selectors.integrationPagePO.CLONE_FLOW_INTABLE
    );
    var detachflow = await io.homePage.getText(
      selectors.flowBuilderPagePO.DETACHFLOW
    );
    var deleteflow = await io.homePage.getText(
      selectors.integrationPagePO.DELETE_FLOW
    );

    await io.assert.expectToBeValue(String(editflow), "Edit flow", "");
    await io.assert.expectToBeValue(String(auditlogs), "View audit log", "");
    await io.assert.expectToBeValue(String(usedby), "Used by", "");
    await io.assert.expectToBeValue(String(downloadflow), "Download flow", "");
    await io.assert.expectToBeValue(String(cloneflow), "Clone flow", "");
    await io.assert.expectToBeValue(String(detachflow), "Detach flow", "");
    await io.assert.expectToBeValue(String(deleteflow), "Delete flow", "");

    test.step("all fields are shown correctly", async ()=>{});

    await io.homePage.click(selectors.basePagePO.AUDITLOG);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on Audit Logs ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.EXPORT_IMPORT
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const url = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue("/edit",url, "");
    test.step("*** Edit Page open test.afterEach clicking ***", async ()=>{});

    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C2256_C2248_ActionDropDown_AuditLog_Window_Close"
    );
    await io.homePage.isPageReady();
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.CLICKONFLOW,
      "TC_C2256_C2248_ActionDropDown_AuditLog_Window_Close"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    test.step("Open Connections tab in Flow", async ()=>{});
    var connName = await io.homePage.getText(
      selectors.myAccountPagePO.CONN_NAME
    );

    await io.homePage.click(selectors.basePagePO.HOME);
    test.step("*** Click on home Page ***", async ()=>{});
    await io.homePage.loadingTime();
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      connName
    );
    await io.homePage.isPageReady();
    test.step("*** Search For Connection ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      0
    );
    test.step("*** Click on action dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.DEBUG_CONNECTION
    );
    test.step("*** Click on DebugConnection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.DEBUGDURATIONNEXT15MINS
    );
    test.step("*** Select 15min debug time ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Save and close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C2256_C2248_ActionDropDown_AuditLog_Window_Close"
    );
    await io.homePage.isPageReady();
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.CLICKONFLOW,
      "TC_C2256_C2248_ActionDropDown_AuditLog_Window_Close"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.homePage.loadingTime();
    test.step("Open Connections tab in Flow", async ()=>{});

    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    await io.homePage.loadingTime();
    test.step("*** Click on Flow Action Drop Down ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.DEBUG_CONNECTION
    );
    test.step("*** Click on DebugConnection ***", async ()=>{});
    await io.homePage.loadingTime();
    var durationtime = await page.locator(
      selectors.flowBuilderPagePO.REFRESH_RESOURCE
    );
    var res = await durationtime.nth(0).textContent();
    await io.assert.expectToContainValue("m remaining", String(res), "");

await test.step(
      "*** Debug time in Flow connections Tab is same as set in the Resource Connection Tab***"
, async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2005 TC_C2037_ActionDropDown_for_FirstFlow", async ({io,page}, testInfo) => {
    //*Create Flows
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    test.step("*** Click on Flow Action Drop Down ***", async ()=>{});
    await io.homePage.loadingTime();
    var editflow = await io.homePage.getText(
      "[data-test='editFlow']"
    );
    var auditlogs = await io.homePage.getText(
      selectors.basePagePO.AUDITLOG
    );
    var usedby = await io.homePage.getText(
      selectors.basePagePO.USEDBY
    );
    var downloadflow = await io.homePage.getText(
      selectors.basePagePO.DOWNLOADFLOWGROUPING
    );
    var cloneflow = await io.homePage.getText(
      selectors.integrationPagePO.CLONE_FLOW_INTABLE
    );
    var detachflow = await io.homePage.getText(
      selectors.flowBuilderPagePO.DETACHFLOW
    );
    var deleteflow = await io.homePage.getText(
      selectors.integrationPagePO.DELETE_FLOW
    );

    await io.assert.expectToBeValue(String(editflow), "Edit flow", "");
    await io.assert.expectToBeValue(String(auditlogs), "View audit log", "");
    await io.assert.expectToBeValue(String(usedby), "Used by", "");
    await io.assert.expectToBeValue(String(downloadflow), "Download flow", "");
    await io.assert.expectToBeValue(String(cloneflow), "Clone flow", "");
    await io.assert.expectToBeValue(String(detachflow), "Detach flow", "");
    await io.assert.expectToBeValue(String(deleteflow), "Delete flow", "");

await test.step(
      "all fields are shown correctly in Action dropwown for first flow"
, async ()=>{});
  });
});
