import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C15499.json";

test.describe("@Env-All @Zephyr-IO-T2767", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Env-All @Zephyr-IO-T2767", async ({ io, page }) => {
    // *Create Page Generators
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);

    // await io.goToFlowsPage();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.basePagePO.DESCRIPTION_INPUT, "description");
    test.step("*** edit description ***", async () => { });

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** click on save and close ***", async () => { });

    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    test.step("*** click on FTP transfer again ***", async () => { });

    await io.homePage.loadingTime();
    // Locate the image
    const img = await page.locator(".MuiBox-root>div>img");
    await expect(img).toBeVisible();
    await test.step(
      "*** Verified the app icons for the bubble drawers are shown even test.afterEach editing the export ***"
      , async () => { });

  });
});
