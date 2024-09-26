
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTPBody from "@testData/STANDALONE/TC_35749_With_Body.json";

test.describe("TC_C35749_Verify_SendPostMappedData_With_Body", () => {

  let importId;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
    
    // Delete the import
    await io.api.deleteCall("v1/imports/" + importId);
    await io.homePage.loadingTime();
  });


  test("@Env-All @Zephyr-IO-T9707 TC_C35749_Verify_SendPostMappedData_With_Body", async ({io,page}, testInfo) => {
    
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTPBody);
    await test.step("*** Created Export :" + flows.get('importId0'),async ()=>{});
    importId = flows.get('importId0');
    
    var importJson1 = await io.api.getImportById(importId);
    await io.assert.expectToBeTrue(importJson1.http.sendPostMappedData == true, "");
    test.step("*** sendPostMappedData flag is set to true for HTTP import created with body ***", async ()=>{});
  });
});
