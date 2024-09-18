
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52606 from "@testData/HTTPConnector2.0/TC_C52606.json";

test.describe("TC_C52606 Verify cloning the newly created flows and run them", () => {
  let flowId: string;
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId])
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();

    const clonedFlowId = await io.api.getFlowId("Clone - " + TC_C52606.name);
    const clonedFlowDoc = await io.api.getCall("v1/flows/" + [clonedFlowId]);
    const clonedPgExportId = clonedFlowDoc?.pageGenerators?.[0]?._exportId;
    const clonedPpImportId = clonedFlowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting cloned flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([clonedFlowId])
    await io.api.deleteCall("v1/exports/" + clonedPgExportId);
    await io.api.deleteCall("v1/imports/" + clonedPpImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17196 @Env-All TC_C52606 Verify cloning the newly created flows and run them", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC_C52606, "FLOWS");
    await test.step("Created Flow " + TC_C52606.name + " With ID " + flowId, async () => {});
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("***Click on more action ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("***Click on Clone flow ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLONEFLOW
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Selecting the required integration ***", async ()=>{});
    await io.homePage.fillWebPage(
      await selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION,
      process.env["IO_Integration_ID"]
    );

    test.step("***Click on Clone flow ***", async ()=>{});
    await io.homePage.click(
      await selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON
    );
    await io.homePage.loadingTime();

    test.step("***Click on configure ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      await selectors.templatePagePO.CONFIGURE,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("***Click on Useexisting connection ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.EXISTING
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "FTP CONNECTION"
    );

    test.step("***Click on Done ***", async ()=>{});
    await io.homePage.click(
      await selectors.basePagePO.SAVE
    );

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("***Click on configure ***", async ()=>{});
    await io.homePage.click(
      await selectors.templatePagePO.CONFIGURE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("***Click on Useexisting connection ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.EXISTING
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "ORDERFUL CONNECTION"
    );

    test.step("***Click on Done ***", async ()=>{});
    await io.homePage.click(
      await selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Searching the flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SEARCH);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH,
      "Clone - " + TC_C52606.name
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Selecting the cloned flow ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.basePagePO.TEMPLATESTABLENAMES,
      "Clone - " + TC_C52606.name
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    // *Enabling and Running the flow
    test.step("*** Enabling Flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_ON_OFF);
    await io.homePage.click(
      selectors.flowBuilderPagePO.FLOW_ENABLE
    );

    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    //Validation in upstream Apps
    var resultJSON = await io.flowBuilder.validateJobCountFromDashBoard(
      "Clone - " + TC_C52606.name,
      TC_C52606.qa__expectedDashboardCount
    )
  });
});
