import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51938 from "@testData/STANDALONE/TC_C51938.json";

test.describe("TC_C51938", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId1 = flowDoc?.pageProcessors?.[0]?._importId;
    const ppImportId2 = flowDoc?.pageProcessors?.[1]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId1);
    await io.api.deleteCall("v1/imports/" + ppImportId2);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T26379 @Env-All TC_C51938", async ({io,page}, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C51938);
    await test.step("Created Flow " + flows.get(TC_C51938.name)["flowName"],async ()=>{});
    flowId = flows.get(TC_C51938.name).flowId;
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    await io.homePage.loadingTime();

    const fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await fileInput.setInputFiles(`testData/assets/FTP_uploads/TC_C51938.json`);
    await io.homePage.loadingTime();

    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Run and check the count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(TC_C51938.name, flows.get(TC_C51938.name)["flowId"],
      [1, 0, 0]
    );

    await io.flowBuilder.navigateToTheFlow(flowId);

    //  Validation in upstream Apps
    await io.flowBuilder.validateJobCountFromDashBoard(TC_C51938.name, TC_C51938.qa__expectedDashboardCount)
  });
});
