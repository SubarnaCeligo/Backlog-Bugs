import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37003_Verify_Google_BigQuery_Connection_ConcurrencyLevel", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7663 @Env-All TC_C37003_Verify_Google_BigQuery_Connection_ConcurrencyLevel", async ({io,page}, testInfo) => {
    //*Create Connection
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("** Selected Google BIgQuery as application **", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GOOGLE_BIGQUERY);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Advanced dropdown ***", async ()=>{});
    var isTargetConcurencyVisible= await io.homePage.isVisible(selectors.connectionsPagePO.RDBMS_TARGET_CONCURRENCY_LEVEL)
    
    if(!isTargetConcurencyVisible){
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    }
    await io.homePage.loadingTime();
    test.step("*** Clicking on Concurrency dropdown ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.RDBMS_TARGET_CONCURRENCY_LEVEL);
    await io.homePage.loadingTime();
    test.step("*** Verifying the elements is present ***", async ()=>{});
    var text = await io.homePage.getText(selectors.flowBuilderPagePO.CONCURRENCYLEVEL_1)
    
    await io.assert.expectToContainValue("1",String(text), "");
    var text2 =await io.homePage.getText(selectors.flowBuilderPagePO.CONCURRENCYLEVEL_2)
    await io.assert.expectToContainValue("2",String(text2), "");
    test.step("*** Clicking on value 1 from concurrency dropdown ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CONCURRENCYLEVEL_1);
    test.step("*** Clicking on Google bigquery connection close ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
  });
});
