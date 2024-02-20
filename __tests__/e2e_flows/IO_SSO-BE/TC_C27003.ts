import { test, expect } from "@celigo/ui-core-automation";

test.describe("E2E Flows", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C27003 Verify api/profile should return authTypeSSO", async ({
    io
  }, testInfo) => {
    await test.step("*** GET /profile and validate ***", async () => {
      const profileResponse = await io.api.getCall("api/profile");
      await io.flowBuilder.loadingTime();
      await io.assert.expectToContainValue(
        "authTypeSSO",
        profileResponse,
        "authType SSO key is not present in Profile response"
      );
    });
  });
});
