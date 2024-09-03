import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DB from "@testData/STANDALONE/DB_connection.json";

test.describe("TC_C34949_PPImport_DB_AFE_Toggle_Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5578 @Env-All TC_C34949_PPImport_DB_AFE_Toggle_Validation", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    test.step("*** Navigate to Resources ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicking on imports ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    test.step("*** Selecting My SQL adapter ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.MYSQL);

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    test.step("*** Choosing the desired My Sql connection ***", async ()=>{});
    var conn = DB[0]["connectionId"];
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.loadingTime();

    test.step("*** Clicking Insert type for the query ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);

    test.step("*** Clicking Query Handle Bar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.QUERYOPENHANDLEBAR);
    
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var queryHandlebar1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(queryHandlebar1, "");
    var queryHandlebar2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(queryHandlebar2, "");

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);
    test.step("*** Clicking on Advance button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);

    test.step("*** Clicking Concurrency ID Handle Bar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CONCURRENCYHANDLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var concHandleBar1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(concHandleBar1, "");
    var concHandleBar2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(concHandleBar2, "");

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);
    test.step("*** Clicking Data URI Handle Bar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.DATAURIHANDLEBAR);
    test.step("*** Verifying toggles bars should not present ***", async ()=>{});
    var dataURI1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(dataURI1, "");
    var dataURI2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(dataURI2, "");

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);
    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
