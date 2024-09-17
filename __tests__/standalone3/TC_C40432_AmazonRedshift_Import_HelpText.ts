import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import amazonRedshift from "@testData/STANDALONE/AmazonRedshift_StandaloneConnection.json";

test.describe("TC_C40432_AmazonRedshift_Import_HelpText_MandatoryFields", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T1915 @Env-All TC_C40432_AmazonRedshift_Import_HelpText_MandatoryFields", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Import ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    var conn = amazonRedshift.connectionId;
    await io.homePage.loadingTime(); 
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired Amazon Redshift connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "amazonRedshiftStandaloneImport");
    test.step("*** Naming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REDSHIFT_IMPORT_CHOOSETYPE_HELP);
    const chooseTypeHelpText = await page.locator(
      selectors.connectionsPagePO.CONNHELPTEXT
    ).textContent();
    await io.assert.expectToContainValue("'Use SQL query once per record' to execute a custom query per record. 'Use SQL query once per page of records' to execute a custom query per page of records.'Use SQL query on first page only' to execute a custom query that runs only once in a flow on the first page of records.Was this helpful?",String(chooseTypeHelpText),"")
    test.step("*** Help Text for choose type field validated ***", async ()=>{});
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.RENAME);

    test.step("*** Clearing Name field to validate mandatory fields ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close button ***", async ()=>{});

    const errorMessage1 = (await io.homePage.getText(selectors.flowBuilderPagePO.ERRORMESSAGE)).toString();
    await io.assert.expectToContainValue("A value must be provided", errorMessage1, "Error message is not displayed");

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "amazonRedshiftStandaloneImport");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close button again after entering name***", async ()=>{});

    const errorMessage2 = (await io.homePage.getText(selectors.flowBuilderPagePO.ERRORMESSAGE)).toString();
    await io.assert.expectToContainValue("A value must be provided", errorMessage2, "Error message is not displayed");

    test.step("*** All mandatory fields error message validated ***", async ()=>{});
    await page.locator(selectors.basePagePO.CLOSE).click();
    await page.locator(selectors.basePagePO.DISCARD_CHANGES).click();
    await io.homePage.loadingTime();
  });
});
