import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Data from "@testData/STANDALONE/TC_C23749_Verify_Error_console_XML_IncorrectWay.json";

test.describe("TC_C37215", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    //confirm  delete 
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();

    var exp_id = await io.api.getExportId('TC_C37215_webhook_export');
    await io.api.deleteExportViaAPI(exp_id);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T1706 @Env-All TC_C37215", async ({io,page}, testInfo) => {
    test.step("*** Click on create flow ***", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Click on add source option ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Click on add source option ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.WEBHOOK);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C37215_webhook_export");
    await io.homePage.click(selectors.flowBuilderPagePO.VERIFICATION);
    await io.homePage.click(selectors.connectionsPagePO.BASIC);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKUSERNAME, "test");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKPASSWORD, "gfhgf");
    await io.homePage.click(selectors.flowBuilderPagePO.WEBHOKKSGENERATEURL);
    await test.step(" Clicking on Generate URL button",()=>{});
    await io.homePage.loadingTime();
    test.step("*** click on the advanced option ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Select HTTP status code ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKHTTPSTATUSCODE, "200");
    test.step("*** Select HTTP mediatype as xml***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKHTTPMEDIA, "xml");
    test.step("*** Click on http body for webhook export ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.WEBHOOKHTTPBODY, 1);
    await io.homePage.loadingTime();
    test.step("*** Add the xml data ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, Data.data);
    test.step("*** Save and close the export ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** click on the created export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LISTENER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Verifying export saved successfully ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.WEBHOOKHTTPBODY, 1);
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.HTTPREQUSTBODY)
    await io.assert.expectToContainValue("xml version", String(data),"");
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CLOSE, 1);
    await io.homePage.loadingTime();

    test.step("*** Select HTTP mediatype as plaintext ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.WEBHOOKHTTPMEDIA, "plaintext");
    test.step("*** Click on http body for webhook export ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.WEBHOOKHTTPBODY, 1);
    await io.homePage.loadingTime();
    test.step("*** Add the plaintext data ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "SampleTest");
    await io.homePage.loadingTime();
    test.step("*** Save and close the export ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** click on the created export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LISTENER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Verifying export saved successfully ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.WEBHOOKHTTPBODY, 1);
    var data1 = await io.homePage.getText(selectors.flowBuilderPagePO.HTTPREQUSTBODY)
    await io.assert.expectToContainValue( "SampleTest",String(data1), "");
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.CLOSE, 1);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE);
  });
});
