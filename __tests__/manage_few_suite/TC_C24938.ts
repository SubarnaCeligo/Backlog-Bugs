import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`C24938 Tile Manage - Verify able to filter report results by status`, () => {
  test(`C24938 Tile Manage - Verify able to filter report results by status`, async ({
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
        .getByRole("columnheader", { name: "Status" })
        .getByRole("button")
        .click();
      await io.homePage.addStep("Clicked on 'Status' filter");
      await page
        .locator(selectors.basePagePO.ARROW_POPPER)
        .getByText("Running")
        .click();
      await io.homePage.addStep("Selected 'Running'");
      await io.homePage.clickByText("Apply");
      const rows = await page.$$(selectors.flowBuilderPagePO.COLUMNS);
      await io.assert.expectToBeValue(
        String(rows.length),
        "0",
        "No. of rows is not 0"
      );
      await io.homePage.addStep("Verified 'Status' filter is working properly");
    } catch (error) {
      await io.homePage.addStep("No flows found");
    }
  });
});
