
import { test } from "@celigo/ui-core-automation";
import ware2go from "@testData/HTTPConnector2.0/TC_C98850.json";

test.describe("TC_C98850", () => {
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
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T25503 @Env-Staging TC_C98850 Verify user is able to create flow using ware2go connection", async ({io,page}, testInfo) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(ware2go);
    flowId = await flows.get(ware2go.name)["flowId"];
    //Run Flow
    await io.api.checkJobStatusFromAPI(ware2go.name, flowId, [2, 0, 0]);
    var resultJSON = await io.flowBuilder.validateJobCountFromDashBoard(ware2go.name, ware2go.qa__expectedDashboardCount)
    test.step("Verified user is able to create flow usingg ware2go connection", async ()=>{});
  });
});
