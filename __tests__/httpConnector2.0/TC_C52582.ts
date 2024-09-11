
import { test } from "@celigo/ui-core-automation";
import TC_C52582 from "@testData/HTTPConnector2.0/TC_C52582.json";

test.describe("TC_C52582", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId])
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17174 @Env-All TC_C52582", async ({io,page}, testInfo) => {
    //*Create Flows
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C52582);
    flowId = await flows.get(TC_C52582.name)["flowId"];
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Run the flow ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(TC_C52582.name, flowId, [2, 0, 0]);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.goToFlowsPage();
  });
});
