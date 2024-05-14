import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_all.json";

test.describe(`C24898 Manage All - Verify Reports Listing page should Contain Report type filter to the right.`, () => {
  test(`@Env-All @Zephyr-IO-T4296 C24898 Manage All - Verify Reports Listing page should Contain Report type filter to the right.`, async ({
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
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Flow events",
      "Report type filter is not displayed"
    );
  });
});
