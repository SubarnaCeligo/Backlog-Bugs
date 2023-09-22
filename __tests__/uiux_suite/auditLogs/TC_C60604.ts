import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C60604 Verify View label colour before hovering over the link and after hovering over the link.`, () => {
  test(`C60604 Verify View label colour before hovering over the link and after hovering over the link.`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    await io.flowBuilder.click('[data-test="auditLogs"]');
    let label = page.locator('[data-test="auditLogChanges"]').first();
    await expect(label).toHaveCSS("color", "rgb(29, 118, 199)");
    await label.hover();
    await expect(label).toHaveCSS("color", "rgb(0, 161, 225)");
    await io.homePage.navigateTo(
      process.env.IO_UI_CONNECTOR_URL + "myAccount/audit"
    );
    label = page.locator('[data-test="auditLogChanges"]').first();
    await expect(label).toHaveCSS("color", "rgb(29, 118, 199)");
    await label.hover();
    await expect(label).toHaveCSS("color", "rgb(0, 161, 225)");
  });
});
