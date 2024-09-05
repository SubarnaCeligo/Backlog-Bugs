import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37138_Verify_Lookup_option_NotShowingUp_forBigQuery", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T7669 @Env-All TC_C37138_Verify_Lookup_option_NotShowingUp_forBigQuery", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.loadingTime();
   
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    test.step("*** Selected BigQuery as the adaptor ***", async ()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Selecting what we want to do with export ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "BIGQUERY CONNECTION");
    test.step("*** Choosing the desired BigQuery connection ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.MARIADB_PER_PAGE);

    test.step("Selecting MERGE operation", async ()=>{});
    await io.homePage.click(selectors.importPagePO.QUERYOPENHANDLEBAR);

    test.step("Opening Handlebar editor", async ()=>{});
    await io.homePage.loadingTime();
    let lookup = await(await page.locator(selectors.flowBuilderPagePO.DBLOOKUP)).isVisible();
    await io.assert.expectToBeFalse(lookup, "");

    await io.homePage.loadingTime();
    test.step("*** Verified lookup option is not present in BigQuery imports  ***", async ()=>{});
  });
});
