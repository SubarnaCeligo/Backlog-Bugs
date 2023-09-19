import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C59643 Verify connection dropdown for exports`, () => {
  test(`C59643 Verify connection dropdown for exports`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.clickByText("Narvar");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    const connectionText = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    )) as string;
    await page.getByText("API type").first().waitFor({ state: "visible" });
    await io.assert.expectToContainValue(
      "Narvar",
      connectionText,
      "Connection name not found"
    );
    await io.assert.expectToContainValue(
      "API type",
      connectionText,
      "API type not found"
    );

    await io.assert.expectToContainValue(
      "API version",
      connectionText,
      "API version not found"
    );
  });
});
