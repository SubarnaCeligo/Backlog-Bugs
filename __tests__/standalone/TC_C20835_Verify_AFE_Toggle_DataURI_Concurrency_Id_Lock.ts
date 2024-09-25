
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C20835_Verify_AFE_Toggle_DataURI_Concurrency_Id_Lock", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  

  test("@Env-All @Zephyr-IO-T5584 TC_C20835_Verify_AFE_Toggle_DataURI_Concurrency_Id_Lock", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
      
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
     
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK");
    await io.homePage.clickByTextByIndex("HTTP ZENDESK CONNECTION", 0);
    await io.homePage.loadingTime();
    test.step("*** Choosing the desired HTTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP Import");
    test.step("*** writing Import Name ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** CLicked on advanced section ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    test.step("*** Clicking on DataURI template Handlebarexpression ***", async ()=>{});
    await io.homePage.loadingTime();
    
    var ele = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    var ele1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(ele, "");
    await io.assert.expectToBeTrue(ele1, "");
    test.step("*** Verifying AFE Toggle Is present ***", async ()=>{});

    test.step("*** Clicking on data URI close button ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);

    test.step("*** Clicking on Http close button ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    test.step("*** Clicking on import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.homePage.click(selectors.flowBuilderPagePO.SAPHANACLOUD);
    test.step("***  Selected SAP HANA cloud as the adaptor ", async ()=>{});

    test.step("*** Selecting Import records ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime();

    test.step("*** Selecting the connection ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HANA_");
    await io.homePage.clickByTextByIndex("HANA_C20835", 0, {exact: false});
    await io.homePage.loadingTime();
    
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicked on Advanced setion ***", async ()=>{});

    await io.homePage.clickButtonByIndex(selectors.importPagePO.ID_LOCK_TEMPLATE, 1);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Concurrency ID lock template ***", async ()=>{});

    var ele = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    var ele1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(ele, "");
    await io.assert.expectToBeTrue(ele1, "");
    test.step("*** Verifying AFE Toggle Is present ***", async ()=>{});

    test.step("*** Clicking on data URI close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);

    test.step("*** Clicking on Http close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
  });
});
