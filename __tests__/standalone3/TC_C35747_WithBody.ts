import { test, expect } from "@celigo/ui-core-automation";
import RestBody from "@testData/STANDALONE/TC_C35747_WithBody.json";
import RestBodyWithoutBody from "@testData/STANDALONE/TC_C35747_WithoutBody.json";

test.describe("TC_C35747_Verify_SendPostMappedData_WithBody", () => {
  let flowId: string;
  let importId: string;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
    
    // Delete the flow and import
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/imports/" + importId);
    await io.homePage.loadingTime();

  });

  test("@Zephyr-IO-T9706 @Env-All TC_C35747_Verify_SendPostMappedData_WithBody", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(RestBody, "FLOWS");
    await io.homePage.loadingTime();

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    importId = flowDoc.pageProcessors[0]._importId;
    const importDoc = await io.api.getCall("v1/imports/" + importId);

    await io.assert.expectToBeTrue(importDoc?.http?.sendPostMappedData == true, "");
    test.step("*** sendPostMappedData flag is set to true for Rest import created with body ***", async ()=>{});
  });

  test("@Zephyr-IO-T9706 @Env-All TC_C35747_Verify_SendPostMappedData_WithoutBody", async ({io,page}, testInfo) => {
     test.step("*** Creating flow ***", async ()=>{});
     flowId = await io.createResourceFromAPI(RestBodyWithoutBody, "FLOWS");
 
     const flowDoc = await io.api.getCall("v1/flows/" + flowId);
     importId = flowDoc.pageProcessors[0]._importId;
     const importDoc = await io.api.getCall("v1/imports/" + importId);
 
     await io.assert.expectToBeTrue(importDoc?.http?.sendPostMappedData == true, "");
     test.step("*** sendPostMappedData flag is set to true for Rest import created with body ***", async ()=>{});
   });
});
