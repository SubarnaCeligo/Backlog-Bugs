import { test, expect } from "@celigo/ui-core-automation";
import RestBody from "@testData/STANDALONE/TC_C35755.json";

test.describe("TC_C35755_Verify_SendPostMappedData_AfterUpdate", () => {
  let flowId: string;
  let importId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow and import
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/imports/" + importId);
    await io.homePage.loadingTime();

  });

  test("@Zephyr-IO-T9709 @Env-All TC_C35755_Verify_SendPostMappedData_AfterUpdate", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.homePage.loadingTime()
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(RestBody, "FLOWS");
    await io.homePage.loadingTime();

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    importId = flowDoc.pageProcessors[0]._importId;
    const importDoc = await io.api.getCall("v1/imports/" + importId);

    const res = await io.api.putCall("v1/imports/" + importId, importDoc)
    const updatedImportJson = await io.api.getCall("v1/imports/" + importId);
    await io.homePage.loadingTime();

    await io.assert.expectToBeTrue(updatedImportJson?.http?.sendPostMappedData == true, "");
    test.step("*** sendPostMappedData flag is set to true even after updating the rest import ***", async ()=>{});
  });
});
