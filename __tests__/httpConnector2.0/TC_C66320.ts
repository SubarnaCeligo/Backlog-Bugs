
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C66320 from "@testData/HTTPConnector2.0/TC_C66320.json";

test.describe("TC_C66320", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
  test("@Zephyr-IO-T18875 @Env-All TC_C66320 Verify flow is working fine", async ({io,page}, testInfo) => {
    flowId = await io.createResourceFromAPI(TC_C66320, "FLOWS");
    await test.step("Created Flow " + TC_C66320.name + " With ID " + flowId, async () => {});
    await io.homePage.loadingTime();

    test.step("*** Navigate to created flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking Run flow ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    //Validation in upstream Apps
    var resultJSON = await io.flowBuilder.validateJobCountFromDashBoard(
      TC_C66320.name,
      TC_C66320.qa__expectedDashboardCount
    )
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
    await test.step(
      "Verified user is able to create flow using Loop return import ",
      async ()=>{}
    );
  });
});
