
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C52592 from "@testData/HTTPConnector2.0/TC_C52592.json";

test.describe("TC_C52592 Verify user is able to create exports for the List all Customers endpoint", () => {
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
  test("@Zephyr-IO-T17184 @Env-All TC_C52592 Verify user is able to create exports for the List all Customers endpoint", async ({io,page}, testInfo) => {
    //*Create Flows
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C52592);
    flowId = await flows.get(TC_C52592.name)["flowId"];
await test.step(
      "Created Flow " +
        flows.get(TC_C52592.name)["flowName"] +
        " With ID " +
        flowId,async () => {

        }
    );
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the created export ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    await io.homePage.loadingTime();
    test.step("*** Click on the Http form view ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL);
    await io.homePage.fill(
      selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL,
      "/v3/relationships"
    );
    test.step("*** Save and close the export ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    test.step("*** Run the flow ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C52592.name,
      flowId,
      [2, 0, 0]
    );
    test.step("*** wait till flow gets completed***", async ()=>{});
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    //  Validation in upstream Apps
    var resultJSON = await io.flowBuilder.validateJobCountFromDashBoard(
      TC_C52592.name,
      TC_C52592.qa__expectedDashboardCount
    )
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
