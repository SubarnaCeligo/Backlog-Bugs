
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C35352_FTP_Batch_Size_Default_Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C35352_FTP_Default_Batch_Size @Env-All @Zephyr-IO-T11715", async ({io,page}, testInfo) => {
    // *Create Page Processors
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Creating Generator ***", async ()=>{});
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async () => { });
    await page.keyboard.type("Ftp");
    await io.homePage.clickByIndex(selectors.connectionsPagePO.FTP_CONNECTION, 0);
    test.step("*** Selected NETSUITE as the adaptor ***", async () => { });
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** validating the batch size value ***", async ()=>{});
    await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.BATCH, "value", "");
    test.step("*** validation completed ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
