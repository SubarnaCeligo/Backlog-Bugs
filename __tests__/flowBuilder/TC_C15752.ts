import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C15752 from "@testData/FlowBuilder/TC_C15752.json";

test.describe("@Env-All @Zephyr-IO-T2771", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T2771", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C15752);
    flowId = await io.api.getFlowId(TC_C15752.name);
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    test.step("Clicked on FTP Transfer.", async ()=>{});
    await io.homePage.loadingTime();
    expect(await page.locator(
      selectors.importPagePO.CLICKPREVIEW
    ).isVisible()).toBeTruthy();
    test.step("Preview button is present in FTP export.", async ()=>{});

  });
});
