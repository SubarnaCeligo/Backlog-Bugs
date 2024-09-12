import { test, expect } from "@celigo/ui-core-automation";
import jsonData from "@testData/STANDALONE/TC_C52691.json";

test.describe("TC_C52691", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T22558 @Env-All TC_C52691", async ({io,page}, testInfo) => {
    test.step("*** Getting response from post request ***", async ()=>{});
    let connMap = await io.api.loadConnections();
    jsonData.postBody._connectionId = await connMap.get(jsonData.postBody._connectionId)
    var response = await io.api.postCall( "v1/imports",  JSON.stringify(jsonData.postBody));
    response = JSON.stringify(response);
    test.step("*** Validating the error message from post Response ***", async ()=>{});
    await io.assert.expectToContainValue("mappings",response, "");
    await io.assert.expectToContainValue("invalid_datatype_enum",response, "");
    await io.assert.expectToContainValue("sourceDataType is not a valid enum value for path",response, "");
    await io.assert.expectToContainValue("sourceDataType",response, "");
  });
});
