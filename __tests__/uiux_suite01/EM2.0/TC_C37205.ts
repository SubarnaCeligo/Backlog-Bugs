import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C37205 Verify on integration level success should be clickable", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T7533 @Env-All @Priority-P2 C37205 Verify on integration level success should be clickable", async ({
    io,
    page
  }) => {
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(process.env.IO_Integration_URL);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "C108673_DND"
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.clickByText("Success");

    let tableBody = await page.$$("table > tbody > tr");
    let count = await tableBody.length;
    for (let i = 8; i <= count; i++) {
      await tableBody[i].scrollIntoViewIfNeeded();
      if (await io.homePage.isVisible(`tbody tr:has-text('Success')`)) {
        await io.flowBuilder.clickByText("Success");
      }
    }
  });
});
