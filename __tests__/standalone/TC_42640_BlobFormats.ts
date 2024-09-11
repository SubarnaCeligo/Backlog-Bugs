
import { test, expect } from "@celigo/ui-core-automation";
import HTTP from "@testData/STANDALONE/TC_C42640_BlobFormats.json";
import BODY from "@testData/STANDALONE/TC_C42640_BlobFormats_Body.json";

test.describe("TC_42640_BlobFormats", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T9909 TC_42640_BlobFormats", async ({io,page}, testInfo) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await test.step("*** Created Flows :" + flows.get(HTTP.name)["flowName"],async ()=>{}
    );

    const exportId = flows.get(HTTP.name)["exportId"];
    let conn = BODY.updatedBody._connectionId;
    conn = io.connMap.get(conn);

    const Response = await io.api.putCall("v1/exports/" + exportId, {...BODY.updatedBody, _connectionId: conn});

    await io.assert.expectToBeValue(String(Response.status()), "200", "");
    test.step(" Verifying Response 200 received with BlobFormat binary ", async ()=>{});

    const Response1 = await io.api.putCall( "v1/exports/" + exportId, {...BODY.updatedBody, _connectionId: conn});
    await io.assert.expectToBeValue(String(Response1.status()), "200", "");
    test.step(" Verifying Response 200 received with BlobFormat hex ", async ()=>{});

    var Response2 = await io.api.putCall( "v1/exports/" + exportId, {...BODY.updatedBody, _connectionId: conn});
    await io.assert.expectToBeValue(String(Response2.status()), "200", "");
    test.step(" Verifying Response 200 received with BlobFormat utf-16le ", async ()=>{});

    const Response3 = await io.api.putCall( "v1/exports/" + exportId, {...BODY.updatedBody, _connectionId: conn});
    await io.assert.expectToBeValue(String(Response3.status()), "200", "");
    test.step(" Verifying Response 200 received with BlobFormat utf8 ", async ()=>{});

    const Response4 = await io.api.putCall("v1/exports/" + exportId, {...BODY.updatedBody, _connectionId: conn});
    await io.assert.expectToBeValue(String(Response4.status()), "200", "");
    test.step(" Verifying Response 200 received with BlobFormat ascii ", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
});
