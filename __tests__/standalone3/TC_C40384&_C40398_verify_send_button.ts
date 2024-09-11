import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40398_send_button.json";

test.describe("TC_C40384_&_C40398_send_button_verify", async () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5910 @Zephyr-IO-T5924 @Env-All TC_C40384_&_C40398_send_button_verify", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime()
    test.step("*** clicking on the import  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKSENDTOGGLE);
   
    // await io.assert.expectToBeTrue(preview_togggle, "");
    test.step("*** clicking on the send toggle  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    
    test.step("*** clicking on the send preview  ***", async ()=>{});
    await io.homePage.loadingTime();
    var http_request =  selectors.exportsPagePO.HTTPREQUEST
    

    await io.assert.checkElementState(http_request, "isVisible");
    await io.assert.verifyElementToBeClickable(http_request)
    expect(http_request).toBeTruthy;
    test.step("*** verifying the HTTP Request tab  ***", async ()=>{});
    var http_response = 
      selectors.mappings.HTTPRESPONSE

    await io.assert.checkElementState(http_response, "isVisible");
    await io.assert.verifyElementToBeClickable(http_response)
    test.step("*** verifying the HTTP Response tab  ***", async ()=>{});
    var parsedoutput =
      selectors.exportsPagePO.PARSED_OUTPUT
   
    await io.assert.checkElementState(parsedoutput, "isVisible");
    await io.homePage.click(parsedoutput);
    await io.assert.verifyElementToBeClickable(parsedoutput)
    test.step("*** verifying the Parsed Output tab  ***", async ()=>{});
    var preview = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToContainValue("statusCode",preview, "");
    await io.assert.expectToContainValue("200",preview, "");
    await io.assert.expectToContainValue("ok",preview, "");
    await io.assert.expectToContainValue("false",preview, "");
    await io.assert.expectToContainValue("channel_not_found",preview, "");
    test.step("*** verifying the parsed output data  ***", async ()=>{});

    await io.assert.verifyElementDisplayedByText('Success!', 'success not visible')
    await io.assert.verifyElementDisplayedByText('1 Page, 1 Record', 'success not visible')

    
    await io.homePage.loadingTime();
    test.step("*** verifying the Success message displayed  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked on close import  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
