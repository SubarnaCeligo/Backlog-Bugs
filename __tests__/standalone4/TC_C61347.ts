
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C61347.json";

test.describe("TC_C61347", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("Delete created flows", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("TC_C61347 @Env-All @Zephyr-IO-T8146", async ({io,page}, testInfo) => {
    // C61347 Verify record throws error in HTTP import request body if Static lookup match is not found and if Action to take if match is not found is set to Fail record
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    flowId = flows.get(HTTP.name)["flowId"];
    console.log(flows);
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{}
    );

    //Navigate to Flow Page
    await io.flowBuilder.navigateToTheFlow( flows.get(HTTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Verifying Error  ***", async ()=>{});
    var data = await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)
    await io.assert.expectToContainValue('"code": "cannot_evaluate_static_lookup"',String(data), "");
    await io.assert.expectToContainValue('"source": "application"',String(data), "");

    test.step("*** Clicking on Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
});
