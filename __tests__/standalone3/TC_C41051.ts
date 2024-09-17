import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C41051.json";

test.describe("TC_C41051", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5934 @Env-All TC_C41051", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await test.step("Created Flow " + flows.get(HTTP.name)["flowName"],async ()=>{});
    flowId = flows.get(HTTP.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow(flowId);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step("*** Clicked on Import ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Preview ***", async ()=>{});

    await io.assert.verifyElementDisplayedByText('Success!', 'success not visible')

    await io.homePage.click(selectors.exportsPagePO.HTTPREQUEST);
    test.step("*** Clicked on HTTP Request   ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
    test.step("*** Clicked on HTTP Request Body ***", async ()=>{});

    var reqBody = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToContainValue("\"name\": \"New Automation Organization\"",reqBody, "");

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW_REQUEST_OTHERS);
    test.step("*** Clicked on HTTP Request Body ***", async ()=>{});

    var reqBody = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToContainValue("\"method\": \"PUT\"",reqBody, "");

    test.step("Verified should show Success Message in drawer", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
