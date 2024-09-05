
import { test, expect } from "@celigo/ui-core-automation";

test.describe("TC_C50265 Verify _httpConnectorId in the connection schema", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-IO-T17203 @Env-All TC_C50265 Verify _httpConnectorId in the connection schema", async ({io,page}, testInfo) => {
    test.step("*** Getting response from ***", async ()=>{});
    const connId = await io.connections.getConnection("ORDERFUL CONNECTION");
    const response = await io.api.getCall( "v1/connections/" + connId,  async ()=>{});
    await expect(response).hasOwnProperty("_httpConnectorIdd");
  });
});
