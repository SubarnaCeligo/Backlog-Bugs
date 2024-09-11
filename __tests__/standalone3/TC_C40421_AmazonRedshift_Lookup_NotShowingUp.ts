import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import amazonRedshift from "@testData/STANDALONE/AmazonRedshift_StandaloneConnection.json";

test.describe("TC_C40421_Verify_Lookup_option_NotShowingUp_forAmazonRedshift", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T7581 @Env-All TC_C40421_Verify_Lookup_option_NotShowingUp_forAmazonRedshift", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Imports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create New Import ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.AMAZON_REDSHIFT);
    test.step("*** Selected Amazon Redshift as the adaptor ***", async ()=>{});
    var conn = amazonRedshift.connectionId;
    await io.homePage.loadingTime()  
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired Amazon Redshift connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "amazonRedshiftStandaloneImport");
    test.step("*** Naming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime()  
    await io.homePage.click(selectors.importPagePO.MARIADB_PER_RECORD);

    test.step("Selecting INSERT operation", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.OPENAI.OPEN_HANDLEBARS_EDITOR);

    test.step("Opening Handlebar editor", async ()=>{});
    await io.homePage.loadingTime();
    let lookup = await(await page.locator(selectors.flowBuilderPagePO.DBLOOKUP)
    ).isVisible();
    await io.assert.expectToBeFalse(lookup, "");
    
    await io.homePage.loadingTime();
    test.step("*** Verified lookup option is not present in AmazonRedshift imports  ***", async ()=>{});
  });
});
