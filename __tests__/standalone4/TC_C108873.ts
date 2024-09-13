
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Template from "@testData/STANDALONE/TC_C108873.json";

test.describe("TC_C108873", () => {
  const flowIds = [],
    integrationIds = [];

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    test.step("Deleting Integrations which might not get deleted due to error in previous test case run ***", async ()=>{});
    await io.api.deleteIntegrationRecursively(Template.Source_Integration);
    await io.api.deleteIntegrationNonRecursively(Template.Source_Integration);

    const integrationId = await io.api.createIntegrationThruAPI(Template);
    integrationIds.push(integrationId);
    test.step("Integration created", async ()=>{});
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    const isListViewVisible = await io.homePage.isVisible(selectors.homePagePO.LIST_VIEW);
    if (isListViewVisible) {
      await io.homePage.click(selectors.homePagePO.LIST_VIEW);
      await io.homePage.loadingTime();
    }
  });
  test.afterEach(async ({io, page}) => {
    await io.api.deleteFlowsWithId(flowIds);
    integrationIds.forEach(async integrationId => { await io.api.deleteIntegration(integrationId);
    });
    test.step("Flows and Integration Deleted", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    const isTileViewVisible = await io.homePage.isVisible(selectors.homePagePO.TILE_VIEW);
    if (isTileViewVisible) {
      await io.homePage.click(selectors.homePagePO.TILE_VIEW);
      await io.homePage.loadingTime();
    }
    test.step("*** Test Suite End ***", async ()=>{});
  });

  test("TC_C108873 @Env-All @Zephyr-IO-T23750", async ({ io, page }) => {
    Template.flowsData.qa__api_tdata.forEach(obj => { obj.createFlow._integrationId = integrationIds[0]; });
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(Template.flowsData, true);
    flows.forEach(flow => { flowIds.push(flow.flowId);
    });
    test.step("4 Flows created", async ()=>{});

    //Run first flow having error
    await io.api.checkJobStatusFromAPI( Template.flowsData.flowname1, flowIds[0], [0, 0, 10]);

    //Run second flow having success
    await io.api.checkJobStatusFromAPI(  Template.flowsData.flowname2, flowIds[2], [0, 0, 10]);

    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.ilm.navigateToIntegrationById( integrationIds[0]);
    await io.homePage.loadingTime();

    await io.flowgrouping.createFlowGroups( Template.flowsData.flowGroup1, [ flows.get(Template.flowsData.flowname1)["flowId"],
        flows.get(Template.flowsData.flowname2)["flowId"],
      ]
    );
    await io.flowgrouping.createFlowGroups( Template.flowsData.flowGroup2, [ flows.get(Template.flowsData.flowname3)["flowId"],
        flows.get(Template.flowsData.flowname4)["flowId"],
      ]
    );
    test.step("  2 Flow Groups created  ", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fill(selectors.homePagePO.SEARCH_INTEGRATION_WDIO, "TC_C108873_Del");
    test.step("***  Searched With Integration Name TC_C108873_Del ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLICKONERRORS, "10 errors");
    await io.homePage.loadingTime();
    await expect(await page.locator(selectors.basePagePO.NOTIFICATION_ID).textContent()
    ).toContain("All open errors in this integration are in this step.");
    test.step("*** Verified pop-up should show : 'All open errors in this integration are in this step' ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** clicking on close ***", async ()=>{});
    var data = await io.homePage.isVisible(await selectors.homePagePO.TILE_VIEW);
    await io.assert.expectToBeTrue(data, "");
    test.step("***   Verified After closing drawer page should re-direct to Home page   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.ilm.navigateToIntegrationById( integrationIds[0]);

    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.integrationPagePO.CLICKONERRORS, "10 errors");
    await expect(await page.locator(selectors.basePagePO.NOTIFICATION_ID).textContent()
    ).toContain("All open errors in this flow are in this step.");
    test.step("*** Verified pop-up should show : 'All open errors in this flow are in this step.' ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    test.step("*** clicking on close ***", async ()=>{});
    await io.homePage.loadingTime();
    var data1 = await io.homePage.isVisible(await selectors.flowBuilderPagePO.CREATEFLOW);
    await io.assert.expectToBeTrue(data1, "");
    test.step("***   Verified After closing drawer page should re-direct to Integration page   ***", async () => { });
  });
});
