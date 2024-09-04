import { test, expect } from "@celigo/ui-core-automation";
import * as TC1 from "@testData/STANDALONE/TC_C35796.json";

test.describe("TC_C35796", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7647 @Env-All TC_C35796", async ({ io, page }, testInfo) => {
    test.step("***Creating an export using post call***", async () => { });
    let connMap = await io.api.loadConnections();
    TC1.body._connectionId = await connMap.get(TC1.body._connectionId)
    var exportDoc = await io.api.postCall("v1/exports", JSON.stringify(TC1.body)
    );
    test.step("*** Validating the export doc***", async () => { });
    await expect(exportDoc).hasOwnProperty("apiIdentifier");
    var api_identifier = exportDoc.apiIdentifier;
    test.step("***Hit the api identifier***", async () => { });
    var api_identifer_response = await io.api.postCall(`${api_identifier}`, "{}");
    api_identifer_response = JSON.stringify(api_identifer_response);
    test.step("***Validating the response from api identifier***", async () => { });
    await io.assert.expectToContainValue("data", api_identifer_response, "");
    await io.assert.expectToContainValue("Name", api_identifer_response, "");
    await io.assert.expectToContainValue("dataURIs", api_identifer_response, "");
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
