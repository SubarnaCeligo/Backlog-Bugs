import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C108177 from "../../testData/inputData/FlowDebugger/C108177.json";

test.describe("TC_C108701 Verify the hostpsot icons for mutiple export and when user change the export", () => {
  test("@Zephyr-T23960 @Env-All @Priority-P2 TC_C108701 Verify the hostpsot icons for mutiple export and when user change the export UI_Backlog", async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(C108177, "FLOWS");

    //Disable the flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );

    await io.homePage.addStep("Running flow in test mode with source 1");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );

    await io.homePage.addStep("Clicking on source 2");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN
    );
    const source2 = await page.locator(selectors.flowBuilderPagePO.SOURCE_DROPDOWN_LIST_ITEM);
    await source2.nth(1).click();

    await io.homePage.addStep("Validating dialog box and it's contents");
    let successCount = await page
      .locator(selectors.myAccountPagePO.DIALOG_BOX)
      .textContent();
    expect(successCount).toContain(
      "Confirm clear test run resultsMaking edits to a flow (including changing the test run source, modifying a step, changing step options, or reordering steps) will clear all test results."
    );

    await io.flowBuilder.clickByText("Continue");

    const resourceBadges = await page.$$(
      selectors.exportsPagePO.TRANSFER_HOTSPOT_ICON
    );

    await io.homePage.addStep("Validating that the test run results are cleared");
    for (let resourceBadge of resourceBadges) {
      let isVisible = await resourceBadge.isVisible();
      expect(isVisible).toBe(false);
    }
  });
});
