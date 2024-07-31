import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./admin.json";

test.describe(`C24899 Monitor tile - Verify Reports Listing page should Contain Report type filter to the right.`, () => {
  test(`@Env-All @Zephyr-IO-T4297 C24899 Monitor tile - Verify Reports Listing page should Contain Report type filter to the right.`, async ({
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
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Flow events",
      "Report type filter is not displayed"
    );
  });
});
