import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/monitorSuite/monitor_all_manage_few.json";

test.describe(`C24896 Monitor All and Manage few  - Verify Reports Listing page should Contain Report type filter to the right.`, () => {
  test(`C24896 Monitor All and Manage few  - Verify Reports Listing page should Contain Report type filter to the right.`, async ({
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
    await io.assert.verifyElementDisplayedByText(
      "Flow events",
      "Report type filter is not displayed"
    );
  });
});
