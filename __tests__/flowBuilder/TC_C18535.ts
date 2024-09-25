import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C18535", () => {

  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    test.step("*** Go to flows page ***", async () => { });
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2954| To verify settings is only shown when developer mode is on", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.selectTabInProfileMenu("Profile");
    test.step("***Navigated To Profile Page***", async () => { });
    await io.homePage.loadingTime();
    var checked = await page.locator(
      "[data-test='developer']"
    ).isChecked();
    await io.homePage.loadingTime();
    if (checked === true) {
      test.step("***Checked The Developer Mode***", async () => { });
    } else {
      await io.homePage.click(
        "[data-test='developer']"
      );
      test.step("***Checked The Developer Mode***", async () => { });
      await io.homePage.click(selectors.basePagePO.MFA_SAVE);
      test.step("***Clicking On Save***", async () => { });
    }
    await io.goToFlowsPage();
    test.step("***Navigated To Flows Page***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SETTINGS);
    await io.homePage.loadingTime();
    expect(await page.getByText('Launch form builder').isVisible()).toBeTruthy();

    await io.homePage.selectTabInProfileMenu("Profile");
    test.step("***Navigated To Profile Page***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      "[data-test='developer']"
    );
    test.step("***Checked The Developer Mode***", async () => { });
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    test.step("***Clicking On Save***", async () => { });
    await io.goToFlowsPage();
  test.step("***Navigated To Flows Page***", async () => { });
  await io.homePage.loadingTime();
  
  // await io.homePage.loadingTime();
  expect(await page.locator(selectors.flowBuilderPagePO.SETTINGS).isVisible()).not.toBeTruthy();
  await io.homePage.selectTabInProfileMenu("Profile");
  test.step("***Navigated To Profile Page***", async () => { });
  await io.homePage.loadingTime();
  await io.homePage.click(
    "[data-test='developer']"
  );
  const checked2 = await (await io.homePage.getElement(`${selectors.flowBuilderPagePO.DEVELOPER_MODE} input`)).isChecked();
  expect(checked2).toBeTruthy();
});
});
