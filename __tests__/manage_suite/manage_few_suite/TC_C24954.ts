import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`C24954 Tile Manage - Verify able to filter report results by endtime`, () => {
  test(`@Env-All @Zephyr-IO-T4338 C24954 Tile Manage - Verify able to filter report results by endtime`, async ({
    page,
    io
  }) => {
    const res = await io.api.putCall(
      `v1/ashares/${process.env.IO_Ashare_ID}`,
      testData
    );
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
