import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C40408_AmazonRedshift_Export_HelpText_MandatoryFields", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1914 @Env-All TC_C40408_AmazonRedshift_Export_HelpText_MandatoryFields", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** Navigated to Exports Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();  
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "AMAZON REDSHIFT CONNECTION");
    test.step("*** Choosing the desired Amazon Redshift connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "amazonRedshiftStandaloneExport");
    test.step("*** Naming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.REDSHIFT_EXPORT_SQLQUERY_HELP);
    await io.homePage.loadingTime()
    var sqlQuery = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Enter a SQL query that retrieves the records you want to export from your source database.Note: For Delta exports, include a comparison to lastExportDateTime or currentExportDateTime in the query, as in the following examples:Oracle SQLSELECT * FROM TABLE_NAME WHERE COLUMN_NAME > TO_TIMESTAMP({{lastExportDateTime}}, 'YYYY-MM-DD\"T\"HH24:MI:SS.ff3\"Z\"')MySQLSELECT * FROM TABLE_NAME WHERE COLUMN_NAME > {{lastExportDateTime}}Was this helpful?Field path: export.rdbms.query",String(sqlQuery),"");
    test.step("*** Help Text for Sql query field validated ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TYPE_HELPTEXT);
    var exportTypeHelpText = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).nth(1).textContent();
    await io.assert.expectToContainValue("All – Export all data, every time the flow runs.",String(exportTypeHelpText),"");
    await io.assert.expectToContainValue("Delta – Export data that has changed since the last time the flow ran.",String(exportTypeHelpText),"");
    await io.assert.expectToContainValue("Once – Export only data that has not been exported already, and then write back to the source app to mark the retrieved records as exported.",String(exportTypeHelpText),"");
    await io.assert.expectToContainValue("Limit – Export a set number of records (max 100). You can change the maximum number of records to export each time the flow runs, default is set to 1. Limit is useful when developing and testing integrations to avoid syncing lots of data.",String(exportTypeHelpText),"");

    test.step("*** Help Text for Export type field validated ***", async ()=>{});
    await io.homePage.clearTextValue(selectors.basePagePO.ADD_NAME);
    test.step("*** Clearing Name field to validate mandatory fields ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close button ***", async ()=>{});
    const errorMessage2 = (await io.homePage.getText(selectors.flowBuilderPagePO.ERRORMESSAGE)).toString();
    await io.assert.expectToContainValue("A value must be provided", errorMessage2, "Error message is not displayed");

    var exportTypeError = await page.locator(
      selectors.flowBuilderPagePO.EXPORTTYPEERROR_MANDATORYFIELD
    ).isVisible();
    await io.assert.expectToBeTrue(exportTypeError, "");
    
    test.step("*** All mandatory fields error message validated ***", async ()=>{});
    await page.locator(selectors.basePagePO.CLOSE).click();
    await page.locator(selectors.basePagePO.DISCARD_CHANGES).click();
    await io.homePage.loadingTime();
  });
});
