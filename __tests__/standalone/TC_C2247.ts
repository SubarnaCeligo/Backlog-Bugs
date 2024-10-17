
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C2247 from "@testData/STANDALONE/TC_C2247.json";

test.describe("TC_C2247", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

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

  test("@Env-All @Zephyr-IO-T1909 TC_C2247", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C2247);
    await test.step("*** Created Flows :" + flows.get(TC_C2247.name)["flowName"],async ()=>{});
    flowId = flows.get(TC_C2247.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    
    test.step("*** Click on created import ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
    test.step("*** Click on headers help text ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HEADERSHELPTEXT);
    test.step("*** Validate the help text***", async ()=>{});
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT)
    await io.assert.expectToContainValue( "In some cases, it may be necessary to include custom HTTP headers with your API requests. As with the 'body' field, any value from the connection or import models can be referenced using {0} with a complete path matching either the connection or import field you require", String(data), "");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
