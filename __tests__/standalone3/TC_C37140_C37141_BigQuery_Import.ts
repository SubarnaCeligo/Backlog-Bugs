import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37140_C37141_BigQuery_Import", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("***Beginning of Test Suite ***", async ()=>{});
     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T7670 @Zephyr-IO-T7692 @Env-All TC_C37140_C37141_BigQuery_Import", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    test.step("*** Selected BigQuery as the adaptor ***", async ()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Selecting what we want to do with import ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "BIGQUERY CONNECTION");
    test.step("*** Choosing the desired BigQuery connection ***", async ()=>{});

    await io.homePage.loadingTime();
    var testresult = await page.locator(selectors.importPagePO.SNOWFLAKE_QUERYTYPE).isVisible();
    await io.assert.expectToBeTrue(testresult, "");
    
    var testresult1 = await page.locator(selectors.importPagePO.MARIADB_PER_RECORD).isVisible();
    await io.assert.expectToBeFalse(testresult1, "");
    
    var testresult2 = await page.locator(selectors.importPagePO.MARIADB_INSERT_BULK).isVisible();
    await io.assert.expectToBeTrue(testresult2, "");
    
    var testresult3 = await page.locator(selectors.importPagePO.MARIADB_FIRST_PAGE).isVisible();
    await io.assert.expectToBeTrue(testresult3, "");
    
    var testresult4 = await page.locator(selectors.importPagePO.MARIADB_PER_PAGE).isVisible();
    await io.assert.expectToBeTrue(testresult4, "");
    test.step("*** Verified user able to view all BigQuery operations on import side  ***", async ()=>{});
  });
});
