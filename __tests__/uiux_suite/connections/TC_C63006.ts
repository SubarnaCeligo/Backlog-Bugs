import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63006 Verify connection dropdown list`, () => {
  test(`C63006 Verify connection dropdown list`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.clickByText("Loop Returns");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    const connectionText = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    )) as string;
    await page.getByText("API version").first().waitFor({ state: "visible" });
    await io.assert.expectToContainValue(
      "Loop Returns",
      connectionText,
      "Connection name not found"
    );
    await io.assert.expectToContainValue(
      "API version",
      connectionText,
      "API version not found"
    );
    expect(connectionText).not.toContain("API type");
    await io.flowBuilder.addStep("Verified 'API type' is not displayed");
  });
});
