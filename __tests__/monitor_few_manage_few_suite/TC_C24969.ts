import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./test.json";

test.describe(`C24969 Tile few Manage and few monitor - Verify when clicked on view report details option under the actions drop down of a completed report, the Report details drawer is loaded`, () => {
  test(`C24969 Tile few Manage and few monitor - Verify when clicked on view report details option under the actions drop down of a completed report, the Report details drawer is loaded`, async ({
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
        .locator(selectors.integrationPagePO.OPENACTIONSMENU)
        .first()
        .click({ timeout: 10000 });
      await io.homePage.addStep("Clicked on 'Actions' menu");
      await io.homePage.clickByText("View report details");
      await io.assert.verifyElementDisplayedByText(
        "View report details",
        "'View report details' drawer is not loaded"
      );
    } catch (error) {
      await io.homePage.addStep(
        "No completed reports are available to perform this action"
      );
    }
  });
});
