
import { test } from "@celigo/ui-core-automation";
import FTP from "@testData/HTTPConnector2.0/TC_C52600.json";

test.describe("TC_C52600", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    const flowDoc = await io.api.getCall("v1/flows/" + [flowId]);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppExportId = flowDoc?.pageProcessors?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[1]?._importId;

    test.step("*** Deleting flow and its resources ***", async ()=>{});
    await io.api.deleteFlowViaAPI([flowId])
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/exports/" + ppExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T17190 @Env-All TC_C52600", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    flowId = flows.get(FTP.name)["flowId"];
    test.step("*** Navigating to flowpage ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();

    //Run Flow
    await io.api.checkJobStatusFromAPI(FTP.name, flowId, [3, 0, 0]);
    //Validation in upstream Apps
    var resultJSON = await io.flowBuilder.validateJobCountFromDashBoard(FTP.name, FTP.qa__expectedDashboardCount)
  });
});
