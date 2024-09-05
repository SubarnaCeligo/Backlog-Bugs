
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C49990 from "@testData/HTTPConnector2.0/TC_C49990.json";

test.describe("TC_C49990 Verify cloning of a flow from Sandbox to Production", () => {
  let flows: Map<string, any> = new Map();
  let sandboxFlowId: string;
  const prodFlowName: string = "Clone - " + TC_C49990.name;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const sandboxFlowDoc = await io.api.getCall("v1/flows/" + [sandboxFlowId]);
    const sandboxPgExportId = sandboxFlowDoc?.pageGenerators?.[0]?._exportId;
    const sandboxPpImportId = sandboxFlowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting sandbox flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([sandboxFlowId])
    await io.api.deleteCall("v1/exports/" + sandboxPgExportId);
    await io.api.deleteCall("v1/imports/" + sandboxPpImportId);
    await io.homePage.loadingTime();

    const prodFlowId = await io.api.getFlowId(prodFlowName);
    const prodFlowDoc = await io.api.getCall("v1/flows/" + [prodFlowId]);
    const prodPgExportId = prodFlowDoc?.pageGenerators?.[0]?._exportId;
    const prodPpImportId = prodFlowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting cloned production flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([prodFlowId])
    await io.api.deleteCall("v1/exports/" + prodPgExportId);
    await io.api.deleteCall("v1/imports/" + prodPpImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17202 @Env-All TC_C49990 Verify cloning of a flow from Sandbox to Production", async ({io,page}, testInfo) => {
    test.step("*** Switching to sandbox environment ***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    //*Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C49990);
    await io.homePage.loadingTime();
    sandboxFlowId = flows.get(TC_C49990.name)["flowId"];
    await test.step(
      "Created Flow " + flows.get(TC_C49990.name)["flowName"] + " With ID " + sandboxFlowId,
      async () => {}
    );

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToEm2Flow(sandboxFlowId);
    await io.homePage.loadingTime();

    test.step("*** Click on more actions***", async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    test.step("*** Click on clone flow***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLONEFLOW);
    await io.homePage.loadingTime();
    test.step("*** Click on production***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.PRODUCTION);
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
    test.step("*** Click on configure***", async ()=>{});
    await io.homePage.click(
      selectors.templatePagePO.CONFIGURE
    );
    await io.homePage.loadingTime();
    test.step("*** Click on use existing connection***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    test.step("*** Select the required connection***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickButtonByIndex(selectors.basePagePO.MENU_ITEM, 1);
    test.step("*** Click on save connection***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );

    test.step("*** Click on production***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Selecting the Standalone flows tile ***", async ()=>{});
    await io.homePage.fill(
      selectors.integrationPagePO.HOME_SEARCH,
      "Standalone flows"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.homePagePO.INTEGRATION_NAME, 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching the flow ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SEARCHBUTTON
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      prodFlowName
    );
    await io.homePage.loadingTime();
    test.step("*** Searching the flow ***", async ()=>{});
    var data = await io.homePage.getText(
      selectors.basePagePO.TEMPLATESTABLENAMES
    );
    test.step("*** Validate the cloned flow ***", async ()=>{});
    await expect(data).toContain(prodFlowName);
  });
});
