import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T2847", () => {

  test("@Env-All @Zephyr-IO-T2847", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async ()=>{});
    
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const checked = await (await io.homePage.getElement(`${selectors.flowBuilderPagePO.DEVELOPER_MODE} input`)).isChecked();
    
    if (checked == true) {
      test.step("***Checked The Developer Mode***", async ()=>{});
    } else {
      await io.homePage.click(selectors.flowBuilderPagePO.DEVELOPER_MODE);
      test.step("***Checked The Developer Mode***", async ()=>{});
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    test.step("*** clicked on Connection in Resources ***", async () => { });
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    test.step("*** clicked on Connection in Resources ***", async () => { });
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    test.step("*** clicked on Connection in Resources ***", async () => { });
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources", "Scripts");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION, 0);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources", "Stacks");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION, 0);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources", "Agents");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CREATE_CONNECTION, 0);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Resources", "API tokens");
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.connectionsPagePO.CREATEAPITOKEN, 0);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
    await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await expect(await page.locator("[aria-label='breadcrumb']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='celigo-help-center']").isVisible()).toBeTruthy();
    await expect(await page.locator("[aria-label='notifications']").isVisible()).toBeTruthy();
    await expect(await page.locator("[data-test='profileMenu']").isVisible()).toBeTruthy();
  });
});
