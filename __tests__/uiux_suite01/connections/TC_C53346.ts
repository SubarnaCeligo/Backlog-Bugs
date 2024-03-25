import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53346 Verify Base URI is not present in Shopify Edit Connection page", () => {
  test("C53346 Verify Base URI is not present in Shopify Edit Connection page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    let isConnectionsVisible = await io.homePage.isVisible(
      selectors.basePagePO.CONNECTIONS
    );
    if (!isConnectionsVisible) await io.homePage.clickByText("Resources");
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.connectionPage.clickByText("SHOPIFY CONNECTION");
    await expect(page.getByText("Base URI")).not.toBeVisible();
  });
});
