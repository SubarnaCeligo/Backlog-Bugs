
import { test, expect } from "@celigo/ui-core-automation";

test.describe("TC_C33697", () => {
  test("@Env-All @Zephyr-IO-T3058|To verify /Tiles route for standalone flows is returning only lastErrorAt, not integration description and LastModified", async ({ io, page }) => {
    //*Create Flows
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    const resp = await io.api.getTilesThruAPI('none');
    await io.homePage.loadingTime();
    console.log(resp);
    await io.homePage.loadingTime();
    const { lastErrorAt, lastModified, description } = resp;
    console.log('texttxtxtxtx', lastErrorAt, lastModified, description);
    await page.pause();
    test.step("*** Created Integration ***", async () => { });
    expect(lastErrorAt).toBeDefined();
    test.step("*** Verifying if lastErrorAt is defined ***", async () => { });
    expect(lastModified).not.toBeDefined();
    test.step("*** Verifying if lastmodified is defined ***", async () => { });
    expect(description).not.toBeDefined();
    test.step("*** Verifying if description is not defined ***", async () => { });
  });
});
