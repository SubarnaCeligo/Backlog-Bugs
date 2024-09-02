import { test, expect } from "@celigo/ui-core-automation";

test.describe("TC_C35553", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2290 @Env-All TC_C35553", async ({io,page}, testInfo) => {
    test.step("*** Redirecting to /legacy url***", async ()=>{});
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "legacy");

    await io.homePage.loadingTime();
    let errorText = await io.homePage.getText("h3")
    await io.assert.expectToBeValue(String(errorText), "This is not the page that you're looking for...", "");
    let errorCode = await io.homePage.getText("h1")
    await io.assert.expectToBeValue(String(errorCode), "404", "");
  });
});
