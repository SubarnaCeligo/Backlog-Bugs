import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C27971&TC_C27972.json";

test.describe("TC_C27971 TC_C27972_HTTP_Import_Updated_Labels", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T9666 @Zephyr-IO-T9667 @Env-All TC_C27971 TC_C27972 Verify Field and Label Updates for HTTP Import in 'Records Import' and 'API Response Patterns' Sections", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    var conn = HTTP.pageProcessors[0].qa__import._connectionId;
    
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(conn);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();

    const httpMethod = await page.$(selectors.basePagePO.HTTP_2DOT0);
    if (httpMethod) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0); 
    }

    test.step("*** Choosing the desired connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);

    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");

    test.step("*** Renaming the PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    
    test.step("*** clicking on the Post methed ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);

    await io.homePage.fillWebPage(selectors.importPagePO.HTTP_BATCHSIZE, "3");
    test.step("*** Set Batch size greater than 1 ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);

    expect(io.assert.checkElementState( "//label[contains(text('Override request media type')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Number of records per HTTP request')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Path to records in HTTP response body')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Path to id field in HTTP response body')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Path to error field in HTTP response body')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Error values')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Path to success field in HTTP response body')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Success values')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Path to detailed error message field in HTTP response body')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Override media type for success responses')]","isVisible") &&
        io.assert.checkElementState("//label[contains(text('Override media type for error responses')]","isVisible") &&
        io.homePage.getDropDownValue(selectors.flowBuilderPagePO.REQUESTMEDIATYPE, "Do not override")
    ).toBeTruthy;
  });
});
