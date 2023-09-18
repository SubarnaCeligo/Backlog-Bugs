import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C59658.json";

test.describe(`C55826 Verify connection dropdown Replace connection in flow builder page connection tab’s actions`, () => {
  test(`C55826 Verify connection dropdown Replace connection in flow builder page connection tab’s actions`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.flowBuilder.click(
      `td ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`
    );
    await io.flowBuilder.clickByText("Replace connection");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    const connectionText = await io.flowBuilder.getText(
      selectors.connectionsPagePO.CONNECTION_OPTION_TEXT
    );
    // Added delay due to dropdown bug
    await io.flowBuilder.delay(1000);
    expect(connectionText).toContain("Narvar");
    await io.flowBuilder.addStep("Verified connection name is displayed");
    expect(connectionText).toContain("API type");
    await io.flowBuilder.addStep("Verified API type is displayed");
    expect(connectionText).toContain("API version");
    await io.flowBuilder.addStep("Verified API version is displayed");
  });
});
