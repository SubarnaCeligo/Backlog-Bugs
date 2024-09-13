import { test, expect } from "@celigo/ui-core-automation";
import jsonData from "@testData/STANDALONE/TC_C52690.json";

test.describe("TC_C52690", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T22557 @Env-All TC_C52690", async ({io,page}, testInfo) => {
    test.step("*** Getting response from post request ***", async ()=>{});
    let connMap = await io.api.loadConnections();
    jsonData.postBody._connectionId = await connMap.get(jsonData.postBody._connectionId)
    var response = await io.api.postCall( "v1/imports",  JSON.stringify(jsonData.postBody));
    response = JSON.stringify(response);
    test.step("*** Validating the error message from post Response ***", async ()=>{});
    await io.assert.expectToContainValue("mappings",response, "");
    await io.assert.expectToContainValue("unsupported_mapping",response, "");
    await io.assert.expectToContainValue("sourceDataType",response, "");
    await io.assert.expectToContainValue("should not be present if",response, "");
    await io.assert.expectToContainValue("mappings",response, "");
    await io.assert.expectToContainValue("field is present. Generate: ErrorCOLLEGE",response, "");
  });
});
