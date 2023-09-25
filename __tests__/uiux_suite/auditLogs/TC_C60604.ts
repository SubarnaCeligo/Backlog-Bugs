import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C60604 Verify View label colour before hovering over the link and after hovering over the link.`, () => {
  test(`C60604 Verify View label colour before hovering over the link and after hovering over the link.`, async ({
    io,
    page
  }) => {
    await io.fillFormUI(testData, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.AUDIT_LOGS);
    let label = page
      .locator(selectors.flowBuilderPagePO.AUDIT_LOG_CHANGES)
      .first();
    await expect(label).toHaveCSS("color", "rgb(29, 118, 199)");
    await label.hover();
    await expect(label).toHaveCSS("color", "rgb(0, 161, 225)");
    await io.homePage.navigateTo(
      process.env.IO_UI_CONNECTOR_URL + "myAccount/audit"
    );
    label = page.locator(selectors.flowBuilderPagePO.AUDIT_LOG_CHANGES).first();
    await expect(label).toHaveCSS("color", "rgb(29, 118, 199)");
    await label.hover();
    await expect(label).toHaveCSS("color", "rgb(0, 161, 225)");
  });
});
