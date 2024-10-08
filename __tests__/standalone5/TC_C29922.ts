import { test, expect } from "@celigo/ui-core-automation";
import RestBody from "@testData/STANDALONE/TC_C29922.json";

test.describe("TC_C29922_Verify_No_RestSubschema_REST", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T2593 @Env-All TC_C29922_Verify_No_RestSubschema_REST", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    flowID = await io.createResourceFromAPI(RestBody, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var importName = await io.impJSON;
    console.log("Import Name", JSON.stringify(importName));

    var importJson1 = await io.api.getImport( importName);
    console.log("Import Json details", JSON.stringify(importJson1));

    expect(importJson1.hasOwnProperty("rest")).toBeFalsy();
    test.step("*** Rest Import with static and dynamic lookup has only HTTP Subschema ***", async ()=>{});
  });
});
