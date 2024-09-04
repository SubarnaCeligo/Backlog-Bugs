
import { test, expect } from "@celigo/ui-core-automation";
import TC_C52583 from "@testData/HTTPConnector2.0/TC_C52583.json";

test.describe("TC_C52583", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T17175 @Env-All TC_C52583", async ({io,page}, testInfo) => {
    test.step("*** Creating a connection wth invalid version ***", async ()=>{});
    let response = await io.api.postCall("v1/connections", JSON.stringify(TC_C52583.Body));
    await io.homePage.loadingTime();
    response = JSON.stringify(response);
    test.step("*** Validate the error message ***", async ()=>{});
    await io.assert.expectToContainValue("http._httpConnectorVersionId",response, "");
    await io.assert.expectToContainValue("invalid_field",response, "");
    await io.assert.expectToContainValue("Cast to ObjectId failed for value",response, "");
    await io.assert.expectToContainValue("http._httpConnectorVersionId",response, "");
  });
});
