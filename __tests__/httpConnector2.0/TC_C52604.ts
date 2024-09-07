
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52604 from "@testData/HTTPConnector2.0/TC_C52604.json";

test.describe("TC_C52604 Verify converting assistant import to formview", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[1]?._importId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId])
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17194 @Env-All TC_C52604 Verify converting assistant import to formview", async ({io,page}, testInfo) => {
    //*Create Flows
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C52604);
    flowId = flows.get(TC_C52604.name)["flowId"];
    await test.step(
      "Created Flow " + flows.get(TC_C52604.name)["flowName"] + " With ID " + flowId,
      async () => {}
    );
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the created import ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT
    );
    await io.homePage.loadingTime();
    test.step("*** Click on the Http form view ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
await test.step(
      "*** Verifying the name field present in formview ***"
, async ()=>{});
    var data = await io.homePage.isVisible(
      selectors.basePagePO.ADD_NAME
    );
    await io.assert.expectToBeTrue(data, "");
await test.step(
      "*** Verifying the Http method field present in formview ***"
, async ()=>{});
    data = await io.homePage.isVisible(
      selectors.importPagePO.SELECTHTTPMETHOD
    );
    await io.assert.expectToBeTrue(data, "");
await test.step(
      "*** Verifying the Http Relative URI field present in formview ***"
, async ()=>{});
    data = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.RELATIVEURL
    );
    await io.assert.expectToBeTrue(data, "");
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RELATIVEURL,
      "/v1/radar/value_lists/rsl_1M4OLBCvObCsxWo8uYxijTWU"
    );
await test.step(
      "*** Verifying the Http Body field present in formview ***"
, async ()=>{});
    data = await io.homePage.isVisible(
      selectors.importPagePO.BODY
    );
    await io.assert.expectToBeTrue(data, "");
    test.step("*** Save and close the export ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    test.step("*** Run the flow ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C52604.name,
      flowId,
      [2, 0, 0]
    );
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.goToFlowsPage();
  });
});
