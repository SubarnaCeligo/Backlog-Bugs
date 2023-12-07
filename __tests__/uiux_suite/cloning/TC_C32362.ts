import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C32362 Verify cloned integration has the updated flow after updating the settings`, () => {
  test(`C32362 Verify cloned integration has the updated flow after updating the settings`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.clickByTextByIndex("C32362_DND", 0);
    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.clickByText("Please select");
    await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await page
      .getByRole("menuitem")
      .filter({ hasNotText: "Offline" })
      .nth(1)
      .click();
    await io.homePage.addStep("Selected connection from dropdown");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await page
      .getByRole("menuitem")
      .filter({ hasNotText: "Offline" })
      .nth(1)
      .click();
    await io.homePage.addStep("Selected connection from dropdown");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.clickByTextByIndex("Configure", 0);
    await io.flowBuilder.clickByText("Use existing connection");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await page
      .getByRole("menuitem")
      .filter({ hasNotText: "Offline" })
      .nth(1)
      .click();
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.clickByTextByIndex("Clone - C32362_DND", 0);
    await io.homePage.click('[data-test="connections"]');
    await io.assert.verifyElementDisplayedByText(
      "347 NS CONNECTION",
      "347 NS CONNECTION step is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "FTP connection",
      "FTP connection step is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "SALESFORCE CONNECTION",
      "SALESFORCE CONNECTION step is not displayed"
    );
  });
});
