
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/STANDALONE/TC_31865_Connection.json";

test.describe("TC_31865", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Delete created Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( "Revoke Token HTTP shopify");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T4573 TC_31865", async ({io,page}, testInfo) => {
    
    test.step("*** Beginning of Test ***", async ()=>{});
    var connId = await io.connections.createConnectionViaAPI(HTTP.apiJSON);
    var request = await io.api.putCall( `v1/connections/` + connId,  HTTP.updatedBody);
    const apiResp = JSON.stringify(request);

    await io.assert.expectToContainValue("Unprocessable Entity",apiResp, "");
    test.step("Verifying Error", async ()=>{});
    // await io.assert.expectToContainValue("http.auth.token.revoke.uri",String(request), "");
    // await io.assert.expectToContainValue("invalid_domain",String(request), "");
    // await io.assert.expectToContainValue("The domain of the revoke uri should be same as that of the domain of http.auth.oauth.tokenURI",String(request), "");
    // test.step("Verified through API, Upon updating the revoke URL with invalid domain on connection doc which does not contain Iclient details  an user friendly error message was thrown", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page", async ()=>{});
  });
});
