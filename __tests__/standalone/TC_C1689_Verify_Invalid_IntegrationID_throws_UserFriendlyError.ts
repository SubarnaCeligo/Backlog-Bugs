import { test, expect } from "@celigo/ui-core-automation";
import TC from "@testData/STANDALONE/TC_C1689_Verify_Invalid_IntegrationID_throws_UserFriendlyError.json";

test.describe("TC_C1689_Verify_Invalid_IntegrationID_throws_UserFriendlyError", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T2229 TC_C1689_Verify_Invalid_IntegrationID_throws_UserFriendlyError", async ({io,page}, testInfo) => {
    var randomIntegration = await io.api.getCall("v1/integrations/" + TC.integrationID);
    await expect(randomIntegration).toEqual(TC.expected);
await test.step(
      "*** Verified that IO throws understandable user error message when provided invalid integration id ***"
, async ()=>{});
  });
});
