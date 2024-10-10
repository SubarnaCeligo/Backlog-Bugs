
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C20046.json";
import snowflake from "@testData/STANDALONE/TC_C20046_Snowflake.json";
const os = require('os');

test.describe("TC_C20046", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1854 TC_C20046", async ({io,page}, testInfo) => {

    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SNOWFLAKE);
    test.step("*** Selected snowflake as the adaptor ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    test.step("*** Clicking on what would you like to do ", async ()=>{});
    test.step("*** Clicking on Look up additional records ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var connection = HTTP[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "SNOWFLAKE CONN");
    await io.homePage.clickByTextByIndex(connection, 0, {exact: false});
    await io.homePage.loadingTime();
    test.step("*** Choosing the Snowflake connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Snowflake import");
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_SQL);
    test.step("*** Clicking on the question mark ***", async ()=>{});

    const choosetypehelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await expect(choosetypehelptext).toContain("'Use optimized bulk load (recommended for larger imports)' to load large volume of data via files.");
    await expect(choosetypehelptext).toContain("'Use batch insert SQL query' to quickly insert batches of data efficiently.");
    await expect(choosetypehelptext).toContain("'Use SQL query once per record' to execute a custom query per record. ");
    await expect(choosetypehelptext).toContain("'Use SQL query once per page of records' to execute a custom query per page of records.");
    await expect(choosetypehelptext).toContain("'Use SQL query on first page only' to execute a custom query that runs only once in a flow on the first page of records.");

    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);
    await io.homePage.click(selectors.exportsPagePO.SQLQUERY_HELP_TEXT);
    test.step("*** Clicking on the question mark ***", async ()=>{});
 
    const perrecordhelptext = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE)
    await expect(perrecordhelptext).toContain("Enter the exact SQL query to be sent to your database including handlebars expressions. This query can be static or dynamic. Handlebars themselves are not submitted in the query, but they insert and send the data you request (values, records, and flow settings) in the SQL query. An example query would be:");
    await expect(perrecordhelptext).toContain("EXEC pdi_sp_UpdateCustomerPostSync");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.QUERYOPENHANDLEBAR);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    const platform = os.platform();

    if (platform === 'darwin') {
      await page.keyboard.press('Meta+A'); 
      await page.keyboard.press('Meta+C');
    } else {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Control+C');
    }
    const copiedText: any = await page.evaluate(() => navigator.clipboard.readText()); 

    var response = JSON.stringify(copiedText);

    await expect(response).toContain(snowflake.connection.name);
    test.step("*** Verified field help texts in Snowflake import and verified handlebar data in array format   ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
