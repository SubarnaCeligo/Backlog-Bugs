import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C55826 Verify connection dropdown Replace connection in flow builder page connection tab’s actions`, () => {
  test(`@Env-All @Zephyr-IO-T21792 C55826 Verify connection dropdown Replace connection in flow builder page connection tab’s actions`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData, "FLOWS");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.flowBuilder.click(
      `td ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`
    );
    await io.flowBuilder.clickByText("Replace connection");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await page.getByText("API type").first().waitFor({ state: "visible" });
    const connectionText = (await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    )) as string;
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
