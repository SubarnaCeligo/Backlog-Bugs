import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/STANDALONE/SF_foobar_connection.json";

test.describe("TC_C42382_SF_Export_Verify_lastExportDateTime_and_currentExportDateTime_displayed", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T17161 @Env-All TC_C42382_SF_Export_Verify_lastExportDateTime_and_currentExportDateTime_displayed", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SF);
    test.step("*** Selected Salesforce as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    test.step("*** Selecting what we want to do with export ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    var conn = SF[0]["connectionId"];
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired Salesfroce connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "delta");

    test.step("*** Selecting delta as export type ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.SF_SOQL_QUERY, 1);

    test.step("*** Clicking on query handlebar ***", async ()=>{});
    var sourceOutput= await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("lastExportDateTime", sourceOutput, "lastExportDateTime is not present in sample data");
    await io.assert.expectToContainValue("currentExportDateTime", sourceOutput, "currentExportDateTime is not present in sample data");
  });
});
