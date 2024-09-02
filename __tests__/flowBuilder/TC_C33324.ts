import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T3054 To verify sort option is available for 'Last Open error' and 'Type' column", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.api.deleteIntegrationRecursively("Test_Integration");
  });
  test("@Env-All @Zephyr-IO-T3054", async ({io,page}) => {
    test.step("***Creating an integration***", async ()=>{});
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.basePagePO.NAME,
      "Test_Integration"
    );
    await io.homePage.loadingTime();
    test.step("*** Entered Integration Name***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("***Clicked On Save.***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
    const errorElement = await page.getByText('Last open error');
    const typeElement = await page.getByText('Type');

    expect(errorElement).toBeVisible();
    expect(typeElement).toBeVisible();

    await errorElement.click();
    await io.myAccountPage.loadingTime();
    expect(await errorElement.textContent()).toContain('sorted descending')
    await typeElement.click();
    await io.myAccountPage.loadingTime();
    expect(await typeElement.textContent()).toContain('sorted ascending')
  });
});
