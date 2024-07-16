import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C63011.json";

test.describe(`C27103 In the Date range window of the Run report drawer, we should not be able to set end time that is in future`, () => {
  test(`@Env-All @Zephyr-IO-T4369 C27103 In the Date range window of the Run report drawer, we should not be able to set end time that is in future`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + "reports/eventreports"
    );
    await io.homePage.clickByText("Run report");
    await io.homePage.clickByText("Choose integration");
    await page.getByRole("menuitem").nth(1).click();
    await io.homePage.clickByText("Choose date range");
    await io.homePage.clickByText("Custom");
    const nextDateButtonClass = await page
      .locator(".rdrDayToday")
      .evaluate(e => e.nextElementSibling.className);
    await io.assert.expectToContainValue(
      "rdrDayDisabled",
      nextDateButtonClass,
      "Next date button is not disabled"
    );
  });
});
