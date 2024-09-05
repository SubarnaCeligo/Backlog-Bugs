import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/netsuite_standalone_imports.json";

test.describe("TC_C36313_Netsuite_standalone_imports", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T6580 @Env-All TC_C36313_Item_Location_Configuration_", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime()
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected NETSUITE as the adaptor ***", async ()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    var conn = NS["connectionId"];
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired NETSUITE connection ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_NS_Item_location_configuration");
    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RECORD_TYPE);
    test.step("*** Refreshing the RecordType of NETSUITE ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Advanced section ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SUITEAPP2);
    test.step("*** Selecting the  the NS  SuiteScript 2.0 ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.RECORD_TYPE);
    await page.keyboard.type("Item Location");
    test.step("*** Selecting the Item Location Configuration RecordType ***", async ()=>{});
    
    await io.assert.verifyElementDisplayedByText("Item Location Configuration", "Record type not visible");
    test.step("*** Verifying whether the Item Location Configuration drop-down selected or not ***", async ()=>{});
  });
});
