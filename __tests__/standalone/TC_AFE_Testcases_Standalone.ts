import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Rest from "@testData/STANDALONE/Zendesk_Connection_SD2.json";

test.describe("TC_C51391_C51393_C51394_C51395_C51399_51400", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T5620 @Zephyr-IO-T5622 @Zephyr-IO-T5623 @Zephyr-IO-T5624 @Zephyr-IO-T5628 @Zephyr-IO-T5629 TC_C51391_C51393_C51394_C51395_C51399_51400", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    // ***** Create Page Generator *****
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await test.step("*** Selected Rest(API) as the adaptor ***",()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var connection = Rest[0]["connectionId"];
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, connection);
    test.step("*** Choosing the desired RestAPI connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "ZD Rest Export");
    test.step("*** Naming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** writing the Relative URL :users ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "users");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting Export type method from  DROPDOWN ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    test.step("*** Clicking on Nonstandard API Reponse  ***", async ()=>{});
    await io.homePage.fillWebPage( selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, "users");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving and closing the export***", async ()=>{});
    // ****** Editinng  Page Generator ******
    await io.homePage.loadingTime();
    await io.homePage.click( selectors.flowBuilderPagePO.EXPORT);
    test.step("*** Editing the Export ***", async ()=>{});
    await io.homePage.loadingTime();
    // ****** REST API EXPORT Editing  Relaitve URI TC_C51391 ******
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/users/378446729457");
    test.step("*** Modifying the Relative URL :/users/378446729457 ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.homePage.fillWebPage( selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, " ");
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicking on Preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    const reqURL = await io.homePage.getText(selectors.importPagePO.REQURL);
    await io.assert.expectToBeValue(String(reqURL), "https://d3v-celigolabs.zendesk.com/api/v2/users/378446729457", "");
    
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();

    test.step("*** Verifying the Response as Per relative URL ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Advance ***", async ()=>{});
    
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    test.step("*** Clicking on DataURI template Handlebarexpression ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    // ****** REST API EXPORT DataURI template TC_C51393 ******
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION, "{{record.user.id}}");
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    test.step("*** Click on Auto preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var AFE1Data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.homePage.loadingTime();

    await io.assert.expectToContainValue( "378446729457", String(AFE1Data), "");

    test.step("***Validating the AFE output data ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Data uri temaplate ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});

    // ******  REST API EXPORT  Ovveride Trace key template TC_C51394 ******
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER, 1);
    test.step("*** Clicking on Override Trace Key template handler ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION, "{{record.user.email}}");
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    test.step("*** Clicking on Auto preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    var AFE1Data2 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("customer@example.com", String(AFE1Data2), "");
    
    test.step("***Validating the AFE output data ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Override trace key template ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    
    test.step("*** Saving & Closing the Export ***", async ()=>{});
    // ***** Create Page Processor  *******

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await test.step("*** Selected Rest(API) as the adaptor ***",()=>{});

    test.step("*** Clicking on type of import ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});

    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});

    var connection = Rest[0]["connectionId"];
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, connection);
    test.step("*** Choosing the desired RestAPI connection ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "ZD Rest Import");
    test.step("*** Naming the PageProcessors ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on NEXT button ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");
    
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "users");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Saving Import ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
    // ***** Editing  Page Processor  *******
    await io.homePage.loadingTime();
    test.step("*** Editing the PageProcessors ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);
    test.step("*** Clicking on Relative URL Handlebarexpression ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    // ****** REST API IMPORT Editing  Relaitve URI TC_C51395 ******
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION, "{{record.user.role}}");
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    test.step("*** Click on Auto preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var AFE1Data3 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT)
    await io.assert.expectToContainValue( "end-user", String(AFE1Data3),"");
    test.step("***Validating the AFE output data ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Relative URL temaplate ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.ADVANCED);
    test.step("*** Clicking on Advance  ***", async ()=>{});
    // ****** REST API IMPORT DataURI template TC_C513400 ******

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE, 1);
    test.step("*** Clicking on DataURI template Handlebarexpression ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION, "{{record.user.id}}");
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    test.step("*** Click on Auto preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var AFE1Data4 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT)
    await io.assert.expectToContainValue( "378446729457", String(AFE1Data4),"");
    test.step("***Validating the AFE output data ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing Data uri temaplate ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});
    
    // ****** REST API IMPORT Concurrency Id lock Template TC_C513499 ******
    await io.homePage.clickButtonByIndex("[data-test='idLockTemplate']", 1);
    test.step("*** Clicking on Concurrency ID lock template Handlebarexpression ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.ENTERHANDLEBAREXPRESSION, "{{record.user.url}}");
    test.step("*** Entering data in handlebar template ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    test.step("*** Click on Auto preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var AFE1Data5 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    test.step("***DEBUG LOG " + String(AFE1Data5).split(".json")[0], async ()=>{});
    test.step("***DEBUG LOG " + String(AFE1Data5).split(".json")[0]?.trim() + ".json", async ()=>{});
    const actualVal = String(AFE1Data5).split(".json")[0]?.trim() + ".json";
    await io.assert.expectToContainValue("https://d3v-celigolabs.zendesk.com/api/v2/users/378446729457.json", actualVal, "");
    test.step("***Validating the AFE output data ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    test.step("*** Closing concurrency ID lock template temaplate ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.goToFlowsPage();
  });
});
