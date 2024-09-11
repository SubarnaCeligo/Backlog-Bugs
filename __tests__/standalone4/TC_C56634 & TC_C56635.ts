import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
  

test.describe("[HTTP Adapter] OAuth 2 Re-design", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  test("TC_C56634_Verify user is able to see new  iclients icon test.afterEach agents under resources. @Env-All @Zephyr-IO-T16885", async ({ io, page }, testInfo) => {
    var value = await(await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).isVisible();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    const isIclientsTabAvailable = await io.homePage.isVisible(selectors.connectionsPagePO.ICLIENTSTAB);
    await io.assert.expectToBeTrue(isIclientsTabAvailable, "Iclients tab not available");
    test.step("*** iClient icon is PRESENT under Resources Tab ***", async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C56635_Verify the iclient icon is in correct allignment. @Env-All @Zephyr-IO-T16886", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();

    const isIclientsTabAvailable = await io.homePage.isVisible(selectors.connectionsPagePO.ICLIENTSTAB);
    await io.assert.expectToBeTrue(isIclientsTabAvailable, "Iclients tab not alligned correctly");
    test.step("*** iclients icon is added in correct allignment ***", async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
