
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/STANDALONE/TC_20022.json";
import NS1 from "@testData/STANDALONE/TC_20022_Conn.json";

test.describe("TC_20022", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId);
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T4413 TC_20022", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(NS);
    await test.step("*** Created Flows :" + flows.get(NS.name)["flowName"],async ()=>{});
    flowId = flows.get(NS.name)["flowId"];
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Netsuite_TC_20022_DND");
    await io.homePage.loadingTime();
    await (await page.locator(selectors.integrationPagePO.OPENACTIONSMENU)).first().isVisible();
    await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
    test.step("*** Clicked on Action Menu ***", async ()=>{});
    await (await page.locator(selectors.integrationPagePO.DELETE_FLOW)).first().isVisible();
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    test.step("*** Clicked on Delete Connection ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.DELETE)).first().isVisible();
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    
    test.step("*** Clicked on confirm delete connection ***", async ()=>{});
    test.step("*** Verified Message ***", async ()=>{});
    let errorEl = await page.getByText("This connection is referenced by the resources below. Only resources that have no references can be deleted.");
    await errorEl.waitFor({ state: 'visible', timeout: 90000 });
    await expect(errorEl).toBeVisible();
    test.step("*** Verified we are not able to delete connection as the connection is referenced by flow ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
