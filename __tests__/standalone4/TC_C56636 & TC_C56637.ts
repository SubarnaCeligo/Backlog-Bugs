import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP Adapter] OAuth 2 Re-design", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  test("TC_C56636_Verify the iclient fields in iclients tab from resource page. @Env-All @Zephyr-IO-T16887", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();

    const iclientHeader = await page.$$(selectors.basePagePO.TEMPLATETABLEHEADING);
    const nameHeader = await iclientHeader[0].textContent();
    await io.assert.expectToContainValue(nameHeader, "Name", "Name is not displayed in iclients tab");
    const applicationHeader = await iclientHeader[1].textContent();
    await io.assert.expectToContainValue(applicationHeader, "Application", "Application is not displayed in iclients tab");
    const lastUpdatedHeader = await iclientHeader[2].textContent();
    await io.assert.expectToContainValue(lastUpdatedHeader, "Last updatedsorted descending", "Last updated is not displayed in iclients tab");
    const actionsHeader = await iclientHeader[3].textContent();
    await io.assert.expectToContainValue(actionsHeader, "Actions", "Actions is not displayed in iclients tab");
    test.step("*** Name, Provider, Last Updated, Actions all fields are present in iclients tab ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C56637_Verify the only custom_oauth 2 iclients are showing. @Env-All @Zephyr-IO-T16888", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.connectionsPagePO.CUSTOM_OAUTH2, "custom_oauth2");
    test.step("*** custom_oauth2 iClient is displayed ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
