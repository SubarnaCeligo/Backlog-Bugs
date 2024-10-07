
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_NO_SuiteApp_No_SuiteBundle.json";

test.describe("TC_C60997_Verify Netsuite API version helptext while creating new NS export and no suiteapp or suitebundle are installed", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C60997 @Env-All @Zephyr-IO-T23034", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Add Source button in flowbuilder page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    test.step("*** Selected Netsuite  as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Choosing type of export from dropdown ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var conn = TC[0]["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByText("NETSUITE_WITH_NO_SUITEAPP_NO_BUNDLE CONNECTION");
    test.step("*** Choosing the desired connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Advanced section ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on Help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.APIVER1);
    test.step("*** Validating help text ***", async ()=>{});
    var helpText = await io.homePage.getText(selectors.flowBuilderPagePO.STACKHELPTEXT);
    await io.assert.expectToContainValue("Choose a NetSuite SuiteScript API version for configuring your step. When selecting SuiteApp SuiteScript 2.x or 1.0, the Celigo integrator.io SuiteApp must already be installed in your NetSuite account. Or for SuiteBundle SuiteScript 1.0, the Celigo integrator.io bundle must already be installed in your NetSuite account.Read more about the new SuiteScript 2.x APIs.",String(helpText), "");
    test.step("*** Verified Help Text for  ‘NetSuite API Version’ ***", async ()=>{});
  });
});
