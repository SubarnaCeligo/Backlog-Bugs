
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C29979", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go to Home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9934 @Env-All TC_C29979 Verify if we are able to use the handlebars in Override", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = 'HTTP STRIPE CONNECTION';
      

    await io.homePage.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired HTTP STRIPE connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    const httpMethod = await page.$(selectors.basePagePO.HTTP_2DOT0);
    if (httpMethod) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0); 
    }
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "STRIPE EXPORT");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** Selecting http method ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVEURI, "/v1/files?limit=1");
    test.step("*** Filling the RelativeURL  ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** Selecting All export type  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE);
    await io.homePage.click( selectors.flowBuilderPagePO.SKIP);
    test.step("*** Selecting Custom relative URI paging method  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGING_RELATIVEURI);
    
    await io.homePage.click(selectors.flowBuilderPagePO.OVERRIDERELATIVEURI);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.OVERRIDERELATIVEURI, "/v1/files?starting_after=file_1JcmDiCv0bCsxWo8Lno1KzN7");
    test.step("*** Filling Override Relative URI  ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OVERRIDERELATIVEURI, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("connection",paste, "");
    await io.assert.expectToContainValue("previous_page",paste, "");
    await io.assert.expectToContainValue("export",paste, "");
    await io.assert.expectToContainValue("settings",paste, "");
  });
});
