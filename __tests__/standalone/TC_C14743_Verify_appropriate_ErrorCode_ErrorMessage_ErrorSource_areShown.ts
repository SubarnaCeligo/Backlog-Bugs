
import { test, expect } from "@celigo/ui-core-automation";
import HTTP from "@testData/STANDALONE/TC_C14743_Verify_appropriate_ErrorCode_ErrorMessage_ErrorSource_areShown.json";

test.describe("TC_C14743_Verify_appropriate_ErrorCode_ErrorMessage_ErrorSource_areShown", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T9642 TC_C14743_Verify_appropriate_ErrorCode_ErrorMessage_ErrorSource_areShown", async ({io,page}, testInfo) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"], async ()=>{});
    const importname = flows.get(HTTP.name)["importId"];

    const importJSON = await io.api.getImportById( importname);
    console.log("Import JSON", JSON.stringify(importJSON));
    test.step("Get Import details by import ID", async ()=>{});

    const postRES = await io.api.postCall(importJSON.apiIdentifier, "{}");
    test.step("Viewing errors in the import", async ()=>{});

    await expect(postRES.errors[0].hasOwnProperty("source")).toBe(true);
    test.step("Verified source is present in the response", async ()=>{});
    await io.assert.expectToContainValue("application",postRES.errors[0].source, "");
    await test.step("Verified appropriate error source is shown in the response", async ()=>{});
    
    await expect(postRES.errors[0].hasOwnProperty("code")).toBe(true);
    test.step("Verified code is present in the response", async ()=>{});
    
    await io.assert.expectToBeValue(String(postRES.errors[0].code), String(422), "");
    await test.step("Verified appropriate error code is shown in the response", async ()=>{});
    
    await expect(postRES.errors[0].hasOwnProperty("message")).toBe(true);
    test.step("verified message is present in the response", async ()=>{});
    
    await expect(postRES.errors[0].message).toContain('{"error":"RecordInvalid","description":"Record validation errors","details":{"name":[{"description":"Name: is too short (minimum one character)","error":"ValueTooShort"}]}}');
    await test.step("Verified appropriate error message is shown in the response", async ()=>{});});
});
