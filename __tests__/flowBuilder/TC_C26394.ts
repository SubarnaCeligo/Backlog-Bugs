import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C26394", () => {
  test("@Env-All @Zephyr-IO-T2987| To verify App is not crashing when trying to open one of the dynamic lookup mappings", async ({io,page}) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill('TC_26394_');
    await io.homePage.loadingTime();
    await io.homePage.clickByText("TC_26394_DND");
    await io.homePage.loadingTime();
    await io.homePage.clickByText("NetSuite Order to Salesforce Opportunity");
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      11
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER,
      2
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      13
    );
    await io.homePage.loadingTime();
    var res2 = await page.locator(".MuiDrawer-root.MuiDrawer-modal>.MuiPaper-root.MuiDrawer-paper").nth(1).isVisible();
    await io.homePage.clickByIndex(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER,
      2
    );
    await io.assert.expectToBeTrue(res2, "");
  });
});
