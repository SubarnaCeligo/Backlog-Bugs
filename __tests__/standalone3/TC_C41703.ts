import { test, expect } from "@celigo/ui-core-automation";

test.describe("TC_C41703", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T907 @Env-All TC_C41703", async ({io,page}, testInfo) => {
    const url = await io.homePage.getCurrentUrl();

    io.assert.expectToBeValue(String(url), `${process.env["IO_UI_CONNECTOR_URL"]}home`, "")
    test.step("*** Landed on home page test.afterEach sign in ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
