import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T3655| Verify 'webhook' application should not be displayed for Page Processor exports", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T3655| Verify 'webhook' application should not be displayed for Page Processor exports", async ({io,page}) => {
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Webhoo');
    await expect(await page.getByText('Your existing flow steps').isVisible()).toBeTruthy();
    await expect(await page.getByText('Webhook').isVisible()).toBeFalsy();
  });
});
