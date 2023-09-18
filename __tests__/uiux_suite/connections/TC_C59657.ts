import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C59657 Verify connection dropdown for lookups`, () => {
  test(`C59657 Verify connection dropdown for lookups`, async ({ io, page }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.clickByText("Narvar");
    await io.flowBuilder.clickByText("Look up additional records (per record)");
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
