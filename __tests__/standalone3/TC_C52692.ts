import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import jsonData from "@testData/STANDALONE/TC_C52692.json";

test.describe("TC_C52692", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T22559 @Env-All TC_C52692", async ({io,page}, testInfo) => {
    let connMap = await io.api.loadConnections();
    jsonData.postBody._connectionId=await connMap.get(jsonData.postBody._connectionId)
    test.step("*** Getting response from post request ***", async ()=>{});
    var response = await io.api.postCall( "v1/imports",  JSON.stringify(jsonData.postBody));
    response = JSON.stringify(response);
    test.step("*** Validating the error message from post Response ***", async ()=>{});
    await io.assert.expectToContainValue("mappings",response, "");
    await io.assert.expectToContainValue("unsupported_mapping",response, "");
    await io.assert.expectToContainValue("sourceDataType",response, "");
    await io.assert.expectToContainValue("should not be present if",response, "");
    await io.assert.expectToContainValue("buildArrayHelper",response, "");
    await io.assert.expectToContainValue("field is present. Generate: id",response, "");
  });
});
