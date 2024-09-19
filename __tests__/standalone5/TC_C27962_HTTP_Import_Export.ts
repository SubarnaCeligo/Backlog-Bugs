
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("TC_C27962", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9544 @Env-All TC_C27962 Verify the fields in 'Configure export type' section are updated as per requirement in HTTP export and Lookups", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on Page generator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    test.step("*** Clicking on type of import ***", async ()=>{});

    var conn = HTTP[0]["connectionId"];
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);

    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_EXPORT");
    test.step("*** Renaming the Export ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Clicking on the Http Method ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    test.step("*** Clicking on the Http GET Method ***", async ()=>{});
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "/customers");
    test.step("*** Providing reltive URL ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** Export type ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LIMITTYPE);
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    test.step("*** Saving the export ***", async ()=>{});
    var test5 = await io.homePage.getTextFromElement(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "Limit - export a set number of records");
    await io.assert.expectToBeTrue(test5, "");
    test.step("*** Verifying Test Export Type***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    var test6 = await io.homePage.getTextFromElement(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "All - always export all data");
    await io.assert.expectToBeTrue(test6, "");
    test.step("*** Verifying ALL Export Type Method***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.exportsPagePO.DELTA);
    await io.homePage.fill(selectors.flowBuilderPagePO.HTTP_GET_RELATIVEURL, "/customers?{{lastExportDateTime}}");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    test.step("*** Verifying Delta Export Type Fields ***", async ()=>{});
    var test7 = await io.homePage.getTextFromElement(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "Delta - export only modified data");
    await io.assert.expectToBeTrue(test7, "");
    var test8 = await io.homePage.getTextFromElement("[id='delta.dateFormat']", "Override delta date format");
    await io.assert.expectToBeTrue(test8, "");
    var test9 = await io.homePage.getTextFromElement("[id='delta.lagOffset']", "Delta date lag offset");
    await io.assert.expectToBeTrue(test9, "");
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** Verifying Once Export Type Fields ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_EXPORT_TYPE_ONCE);
    var test10 = await io.homePage.getTextFromElement("[id='http.once.method']", "HTTP method to update records");
    await io.assert.expectToBeTrue(test10, "");
    var test11 = await io.homePage.getTextFromElement("[id='http.once.relativeURI']", "Relative URI to update records");
    await io.assert.expectToBeTrue(test11, "");
    var result = await io.homePage.getTextFromElement("[id='http.once.body']", "HTTP request body to update records");
    await io.assert.expectToBeTrue(result, "");
  });
});
