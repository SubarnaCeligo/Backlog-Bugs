import { test, expect } from "@celigo/ui-core-automation";
import TC from "@testData/FlowBuilder/TC_C43037.json";

test.describe("TC_C43037", () => {
  let integrationId;

  test.beforeEach(async ({ io }) => {
    let con = await io.api.getConnectionId("HTTP ZENDESK CONNECTION");
    TC.jsonData.qa__api_tdata[0].createIntegrations.settingsForm.form.fieldMap.staticMapRefreshable.keyResource.virtual._connectionId = con;

    test.step("Navigating to Homepage", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteIntegration(integrationId);
    test.step("Deleted integration.", async () => { });
  });

  test("@Env-All @Zephyr-IO-T3088|To verify data is loaded properly in staticMapField", async ({ io, page }) => {
    integrationId = await io.api.createIntegrationThruAPI(TC.jsonData);
    test.step("Created Integration.", async () => { });

    await io.ilm.navigateToIntegrationById(integrationId);
    await io.homePage.loadingTime();
    await io.homePage.click("[data-test='Settings']");
    await io.homePage.loadingTime();
    test.step("Navigated to settings tab.", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.click('[data-test="text-suggest-generate-0"]');
    const opt1 = await page.getByRole('option').nth(0);
    expect(opt1).toContainText('HI');
    const opt2 = await page.getByRole('option').nth(1);
    expect(opt2).toContainText('Check');
  });
});
