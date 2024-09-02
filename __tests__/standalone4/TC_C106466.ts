
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C106466_C106449", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  // FYI: No zephyr test case available
  // test("@Zephyr-IO-T11111 @Env-All TC_C106466", async ({io,page}, testInfo) => {
  //     test.step("Clicking on Create Flow", async ()=>{});
  //     await io.flowBuilder.clickCreateFlowButton();
  //     await io.homePage.loadingTime();

  //     //Export
  //     test.step("*** Clicking on Add Source ***", async ()=>{});
  //     await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);

  //     test.step("*** selecting Salesforce ***", async ()=>{});
  //     await io.homePage.click(selectors.flowBuilderPagePO.SF);
  //     await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
  //     test.step("*** Choosing type of export from dropdown ***", async ()=>{});

  //     test.step("*** Choosing the desired HTTP connection ***", async ()=>{});
  //     var conn = "SALESFORCE CONNECTION";


  //     await io.homePage.fillWebPage(selectors.basePagePO.CONNECTION, conn);
  //     await io.homePage.loadingTime();
  //     let colorOflink = await io.homePage.getCSSProperty('[data-test="application"] > div:nth-child(2) > div > div:nth-child(1) > div',"color");
  //     await io.assert.expectToBeValue(String(colorOflink["parsed"].hex), "#333d47", "");
  //     test.step("*** clicking on close button ***", async ()=>{});
  //     await io.homePage.click(selectors.basePagePO.CLOSE);
  //     await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  //     test.step("*** Clicking on Discard Changes ***", async ()=>{});
  //     await io.homePage.loadingTime();

  //     //Import
  //     await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
  //     test.step("*** Clicked on Pageprocessors ***", async ()=>{});
  //     await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);

  //     test.step("*** Clicking on Import records ***", async ()=>{});
  //     await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

  //     let colorOflink1 = await io.homePage.getCSSProperty('[data-test="application"] > div:nth-child(2) > div > div:nth-child(1) > div',"color");
  //     await io.assert.expectToBeValue(String(colorOflink1["parsed"].hex), "#333d47", "");
  //     test.step("*** clicking on close button ***", async ()=>{});
  //     await io.homePage.click(selectors.basePagePO.CLOSE);
  //     await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  //     test.step("*** Clicking on Discard Changes ***", async ()=>{});
  //     await io.homePage.loadingTime();

  //     //Lookup
  //     await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
  //     test.step("*** Clicked on Pageprocessors ***", async ()=>{});
  //     await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);

  //     test.step("*** Clicking on Import records ***", async ()=>{});
  //     await io.homePage.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);
  //     await io.homePage.loadingTime();
  //     let colorOflink2 = await io.homePage.getCSSProperty('[data-test="application"] > div:nth-child(2) > div > div:nth-child(1) > div',"color");
  // await io.assert.expectToBeValue(String(colorOflink2["parsed"].hex), "#333d47", "");
  //     test.step("*** clicking on close button ***", async ()=>{});
  //     await io.homePage.click(selectors.basePagePO.CLOSE);
  //     await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  //     test.step("*** Clicking on Discard Changes ***", async ()=>{});
  //     await io.homePage.loadingTime();
  //     await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  //     test.step("*** Navigating to Home Page   ***", async ()=>{});
  // });
  test("TC_C106449 @Zephyr-IO-T23734 @Env-All", async ({ io, page }, testInfo) => {
    test.step("Clicking on Create Flow", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();

    //Export
    test.step("*** Clicking on Add Source ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    test.step("*** selecting Salesforce ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SF);
    test.step("*** Choosing type of export from dropdown ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_EXPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fill(selectors.importPagePO.NAME, "Salesforce Export");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.MUI_COMPONENT_SELECT_TYPE);
    await io.flowBuilder.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** clicking on save button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.NAME_GET, "A value must be provided", 0);
    test.step("*** Verified Ui is throwing error when mandatory fields are not populated and form is also not getting saved ***", async ()=>{});

    test.step("*** clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
    await io.homePage.loadingTime();

    //Lookup
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Pageprocessors ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SF);

    test.step("*** Clicking on Import records ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    test.step("*** Renaming the PageGenerator ***", async ()=>{});
    await io.homePage.fill(selectors.importPagePO.NAME, "Salesforce Lookup");
    test.step("*** Selecting the desired RecordType ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.MUI_COMPONENT_SELECT_TYPE);
    await io.flowBuilder.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** clicking on save button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.NAME_GET, "A value must be provided", 0);
    test.step("*** Verified Ui is throwing error when mandatory fields are not populated and form is also not getting saved ***", async ()=>{});

    test.step("*** clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on Discard Changes ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
