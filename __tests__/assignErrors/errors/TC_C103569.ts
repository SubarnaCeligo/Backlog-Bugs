import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C108402.json";

test.describe("TC_C103569 Verify the schedule run for Every hour,Every 30 minutes,Every 15 minutes preset with all weekdays selected", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-All @Zephyr-IO-T26393 C103569 Verify the schedule run for Every hour,Every 30 minutes,Every 15 minutes preset with all weekdays selected", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click("#mui-component-select-frequency");
    await io.flowBuilder.selectTextfromDropDown(page, "Every 15 minutes");
    await io.flowBuilder.delay(1000 * 5 * 1);
    await io.flowBuilder.clickByTextByIndex("Every 15 minutes", 0);
    await io.flowBuilder.click('[data-test="daysToRunOn"]');
    await io.flowBuilder.clickByTextByIndex("Saturday", 1);
    await io.flowBuilder.clickByTextByIndex("Sunday", 1);
    await io.flowBuilder.clickByTextByIndex("Done", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await page.waitForTimeout(10000);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(
      "#mui-component-select-frequency",
      "Every 15 minutes"
    );
    await io.assert.verifyElementContainsText(
      '[data-test="daysToRunOn"]',
      "MondayTuesdayWednesdayThursdayFriday"
    );
    await io.flowBuilder.click("#mui-component-select-frequency");
    await io.flowBuilder.clickByTextByIndex("Every 30 minutes", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await page.waitForTimeout(10000);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(
      "#mui-component-select-frequency",
      "Every 30 minutes"
    );
    await io.assert.verifyElementContainsText(
      '[data-test="daysToRunOn"]',
      "MondayTuesdayWednesdayThursdayFriday"
    );
    await io.flowBuilder.click("#mui-component-select-frequency");
    await io.flowBuilder.clickByTextByIndex("Every hour", 0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await page.waitForTimeout(10000);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementContainsText(
      "#mui-component-select-frequency",
      "Every hour"
    );
    await io.assert.verifyElementContainsText(
      '[data-test="daysToRunOn"]',
      "MondayTuesdayWednesdayThursdayFriday"
    );
  });
});
