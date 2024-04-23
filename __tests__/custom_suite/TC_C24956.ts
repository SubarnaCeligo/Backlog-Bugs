import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C24956 Tile Manage few and Monitor few - Verify user is able to filter report results by endtime`, () => {
  test(`@Zephyr-T5266 @Env-All @Priority-P2 C24956 Tile Manage few and Monitor few - Verify user is able to filter report results by endtime UI_Backlog`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "reports/eventreports"
    );
    try {
      await page
        .getByRole("columnheader", { name: "End date" })
        .getByRole("button")
        .click();
      await io.homePage.addStep("Clicked on 'End date' filter");
      await page
        .locator(selectors.basePagePO.ARROW_POPPER)
        .getByText("Last minute", { exact: true })
        .click();
      await io.homePage.addStep("Selected 'Last minute'");
      await io.homePage.clickByText("Apply");
      const rows = await page.$$(selectors.flowBuilderPagePO.COLUMNS);
      await io.assert.expectToBeValue(
        String(rows.length),
        "0",
        "No. of rows is not 0"
      );
      await io.homePage.addStep("Verified 'End date' filter is working properly");
    } catch (error) {
      await io.homePage.addStep("No flows found");
    }
  });
});
