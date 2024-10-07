
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C2165_Verify_DB_Import_Handlebar_Not_Contain_Data_as_Prefix.json";

test.describe("TC_C2165_Verify_DB_Import_Handlebar_Not_Contain_Data_as_Prefix", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
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

  test("@Env-All @Zephyr-IO-T9300 TC_C2165_Verify_DB_Import_Handlebar_Not_Contain_Data_as_Prefix", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    await test.step("*** Created Flows :" + flows.get(FTP.name)["flowName"],async ()=>{});
    flowId = flows.get(FTP.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    await io.homePage.loadingTime();

    test.step("*** Clcking on created import ***", async ()=>{});
    await io.homePage.click(await selectors.importPagePO.CLICKIMPORT);

    test.step("*** Clcking on sql query handlebar ***", async ()=>{});
    await io.homePage.click(await selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);
    test.step("*** Validating the sql handle bar not contain data. ***", async ()=>{});
    await io.homePage.loadingTime();
    var sqlHandlebarData = await io.homePage.copyResourceData(selectors.flowBuilderPagePO.HTTPREQUSTBODY);
    await expect(sqlHandlebarData).not.toContain("data.");

    test.step("*** Closing the import ***", async ()=>{});
    await io.homePage.click(await "(//button[@data-test='cancel'])[2]");
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
