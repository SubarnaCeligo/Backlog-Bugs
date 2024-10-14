import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51392_C51396", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T5621 @Zephyr-IO-T5625 @Env-All TC_C51392_C51396", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    test.step("*** Choosing the Zendesk HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C51392_C51396_export");
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL :users ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "users");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting Export type method from  DROPDOWN ***", async ()=>{});

    test.step("*** Clicking on Relative URI Handlebar AFE ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);
    await io.homePage.loadingTime()
    test.step("*** Clicking on Preview Button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    var result1: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("users",result1, "");

    test.step("*** Changing input data and template ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('{"dummy": "123"}');

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{dummy}}");
    test.step("*** Clicking on Preview Button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    var result2: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("123",result2, "");

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked on Discard changes  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Clicked on close drawer   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked on Discard changes  ***", async ()=>{});
    await io.homePage.loadingTime()


    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessors ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    test.step("*** Choosing the Zendesk HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C51392_C51396_import");
    test.step("*** Naming the PageProcessors ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");

    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "users");
    test.step("*** Clicking on Relative URI Handlebar AFE ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);
    await io.homePage.loadingTime()
    test.step("*** Clicking on Preview Button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    var result3: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("users",result3, "");

    test.step("*** Changing input data and template ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE)
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type('{"dummy": "456"}');

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{dummy}}");
    test.step("*** Clicking on Preview Button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    var result4: any = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("456",result4, "");

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked on Discard changes  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Clicked on close drawer   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicked on Discard changes  ***", async ()=>{});
    await io.homePage.loadingTime()
  });
});
