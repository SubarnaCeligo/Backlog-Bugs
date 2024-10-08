import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C23016.json";

test.describe("TC_C30777 ", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL); 
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2904 | Verify static lookups that are created under 'manage lookups' in the request body are NOT displayed in the list of manage lookups from 'Run dynamic lookups'", async ({io,page}, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.MYSQLCOMPOSITE
    );
    test.step("Opening Handlebar editor", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.MYSQL_DOCUMENTS
    );
    await io.homePage.loadingTime();
    test.step("Selecting Create lookups", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.DBLOOKUP
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
    );
    test.step("*** Added Static Lookup Name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.importPagePO.NAME_FIELD,
      "Lookup"
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.STATICLOOKUP
    );
    await io.homePage.fillWebPage(
      selectors.mappings.STATICLOOKUPEXPORT,
      "name"
    );
    await io.homePage.click(
      selectors.mappings.STATICLOOKUPIMPORT
    );
    await io.homePage.fillWebPage(
      selectors.mappings.STATICLOOKUPIMPORT,
      "name"
    );
    await io.flowBuilderDashboard.clickByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,1
    );

    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickByIndex(
      selectors.basePagePO.CLOSE,1
    );
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.click('[id="COMPOSITE"]');
    await io.homePage.click(selectors.importPagePO.SPECIFIC_FIELD_POPULATED);
    await io.homePage.click(selectors.importPagePO.DYNAMICLOOKUP);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU,2);
    test.step("*** Clicking on manage lookup ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.MANAGE_LOOKUP
    );
    let lookupName = await io.homePage.getText(await io.homePage.getCellLocator(1, 1));
    await io.assert.expectToBeValue(String(lookupName), "Lookup", "");
    await io.emailPage.closeWindow();
  });
});
