
import { test, expect } from "@celigo/ui-core-automation";

test.describe("TC_C15518", () => {
  test.beforeEach(async ({io}, ) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    test.step("*** Go to flows page ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2768| Custom settings field should not be displayed while creating new Integration ", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    const guide = await page.locator("[data-test='integrationGuide']");
    await guide.isVisible({ timeout: 6000 });

    const labels = await page.$$("label");
    expect(labels.length).toEqual(2);
    expect(await labels[0].textContent()).toContain("Name *");
    expect(await labels[1].textContent()).toEqual("Description");
  });
});
