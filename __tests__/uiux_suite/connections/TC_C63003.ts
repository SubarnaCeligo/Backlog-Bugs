import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63003 Verify connection dropdown while clonning flow`, () => {
  test(`C63003 Verify connection dropdown while clonning flow`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.flowBuilder.clickByText("Narvar_DND");
    await page
      .locator("div")
      .filter({ hasText: /^Narvar_DNDTEST MODEBeta$/ })
      .locator(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON)
      .click();
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByTextByIndex("Automation Flows", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByText("Configure");
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    const connectionText = await page.getByRole("menuitem").nth(1).textContent();
    // added delay due to connection dropdown bug
    await io.flowBuilder.delay(1000);
    expect(connectionText).toContain("Narvar");
    await io.flowBuilder.addStep("Verified connection name is displayed");
    expect(connectionText).toContain("API type");
    await io.flowBuilder.addStep("Verified API type is displayed");
    expect(connectionText).toContain("API version");
    await io.flowBuilder.addStep("Verified API version is displayed");
  });
});
