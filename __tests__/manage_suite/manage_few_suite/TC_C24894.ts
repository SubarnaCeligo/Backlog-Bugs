import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./manage_few.json";

test.describe(`C24894 Manage tile - Verify Reports Listing page should Contain Report type filter to the right.`, () => {
  test(`@Env-All @Zephyr-IO-T4292 C24894 Manage tile - Verify Reports Listing page should Contain Report type filter to the right.`, async ({
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
    await page.getByText("Loading...").waitFor({ state: "hidden", timeout:360000 });
    await io.assert.verifyElementDisplayedByText(
      "Flow events",
      "Report type filter is not displayed"
    );
  });
});
