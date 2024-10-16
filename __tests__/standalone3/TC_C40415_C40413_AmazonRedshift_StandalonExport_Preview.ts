import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import amazonRedshift from "@testData/STANDALONE/TC_C40415_C40413_AmazonRedshift_StandalonExport_Preview.json";

test.describe("TC_C40415_C40413_AmazonRedshift_StandalonExport_Preview", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the export
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, amazonRedshift.name);
    await io.homePage.loadingTime();
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T7585 @Zephyr-IO-T7586 @Env-All TC_C40415_C40413_AmazonRedshift_Standalone_export_validation", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** Navigated to Exports Page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Export ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    var conn = amazonRedshift.pageGenerators[0].qa__export._connectionId;
    await io.homePage.loadingTime();  
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired Amazon Redshift connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, amazonRedshift.name);
    test.step("*** Naming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fill(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT, amazonRedshift.pageGenerators[0].qa__export.rdbms.query);

    test.step("*** SQL query added", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REDSHIFT_EXPORT_TYPE);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.REDSHIFT_SELECTED_EXPORT_RECORDS);
    await io.homePage.loadingTime()
    test.step("*** Export Type selected", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    
    test.step("*** Preview clicked", async ()=>{});
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText('1 Page, 10 Records', 'success not visible')
    test.step("*** Preview data shown", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Export Saved and closed", async ()=>{});
  });
});
