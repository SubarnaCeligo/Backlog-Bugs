
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C49989 from "@testData/HTTPConnector2.0/TC_C49989.json";

test.describe("TC_C49989", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting production flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();

    const clonedFlowId = await io.api.getFlowId("Clone - " + TC_C49989.name);
    const clonedFlowDoc = await io.api.getCall("v1/flows/" + [clonedFlowId]);
    const clonedPgExportId = clonedFlowDoc?.pageGenerators?.[0]?._exportId;
    const clonedPpImportId = clonedFlowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting cloned sandbox flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([clonedFlowId])
    await io.api.deleteCall("v1/exports/" + clonedPgExportId);
    await io.api.deleteCall("v1/imports/" + clonedPpImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17201 @Env-All TC_C49989", async ({io,page}, testInfo) => {
    //*Create Flows
    flowId = await io.createResourceFromAPI(TC_C49989, "FLOWS");
    await test.step("Created Flow " + TC_C49989.name + " With ID " + flowId, async () => {});
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on more actions***", async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on clone flow***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLONEFLOW);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on sandbox***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.SANDBOX);
    test.step("*** Select the integration***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION,
      "none"
    );
    test.step("*** Click on clone flow***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on configure***", async ()=>{});
    await io.homePage.click(
      selectors.templatePagePO.CONFIGURE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on use existing connection***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    test.step("*** Select the required connection***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickButtonByIndex(selectors.basePagePO.MENU_ITEM, 1);
    test.step("*** Click on save connection***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );

    test.step("*** Click on sand box***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.SANDBOX_WDIO);
    await io.homePage.loadingTime();
    test.step("*** Navigate to sandbox integration***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Selecting the Standalone flows tile ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "Standalone flows"
    );
    await io.homePage.clickButtonByIndex(selectors.homePagePO.INTEGRATION_NAME, 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching the flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SEARCH);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH,
      "Clone - " + TC_C49989.name
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching the flow ***", async ()=>{});
    var data = await io.homePage.getText(
      selectors.basePagePO.TEMPLATESTABLENAMES
    );
    test.step("*** Validate the cloned flow ***", async ()=>{});
    await expect(data).toContain("Clone - " + TC_C49989.name);
    test.step("*** Click on production ***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.PRODUCTION_WDIO);
  });
});
