import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/TC_20878.json";
import NS1 from "@testData/STANDALONE/netsuite_standalone_imports.json";

test.describe("TC_20878", () => {
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

  test("@Env-All @Zephyr-IO-T4595 TC_20878", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(NS);
    await test.step("*** Created Flows :" + flows.get(NS.name)["flowName"],async ()=>{});
    flowId = flows.get(NS.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    test.step("*** Clicked on Export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    test.step("*** Clicked on Connection List ***", async ()=>{});

    var list = await io.homePage.getText(selectors.basePagePO.LIST_BOX);
    await io.assert.expectToContainValue("NETSUITE CONNECTION",String(list), "");
    
    test.step("*** Verified List of connections should be shown in the connectin dropdown list ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
