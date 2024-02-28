import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63007 Verify connection dropdown list`, () => {
  test(`C63007 Verify connection dropdown list`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.clickByText("Loop Returns");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    const connectionText = await page
      .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`)
      .filter({ hasText: "Loop Returns NoVer" })
      .first()
      .textContent();
    await io.assert.expectToContainValue(
      "Loop Returns NoVer",
      connectionText,
      "Connection name not found"
    );
    expect(connectionText).not.toContain("API version");
    await io.flowBuilder.addStep("Verified 'API version' is not displayed");
    expect(connectionText).not.toContain("API type");
    await io.flowBuilder.addStep("Verified 'API type' is not displayed");
  });
});
