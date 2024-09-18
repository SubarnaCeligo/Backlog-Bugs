import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C41056.json";

test.describe("TC_C41056_success_message", () => {
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

  test("@Zephyr-IO-T5939 @Env-All TC_C41056_success_messaget", async ({io,page}, testInfo) => {
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
    test.step("*** Clicking on Import***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.click(selectors.importPagePO.CLICKSENDTOGGLE);
    test.step("*** Clicked on send  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicked on send preview   ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.assert.verifyElementDisplayedByText('Success!', 'success not visible')
    test.step("*** Verified the  Success message ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
