import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe(`C32362 Verify cloned integration has the updated flow after updating the settings`, () => {
  test(`@Env-QA @Zephyr-IO-T5337 C32362 Verify cloned integration has the updated flow after updating the settings`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env.IO_Integration_URL);
    await io.homePage.clickByTextByIndex("C32362_DND", 0);
    await io.homePage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.clickByText("Clone flow");
    await io.flowBuilder.clickByText("Please select");
    let menuitem = await page.locator(selectors.basePagePO.MENU_ITEM).first();
    const buttonBoundingBox = await menuitem.boundingBox();
    if (buttonBoundingBox) {
      const x = buttonBoundingBox.x + buttonBoundingBox.width / 2;
      const y = buttonBoundingBox.y + buttonBoundingBox.height / 2;
      await page.mouse.move(x, y);
      const automationFlows = page.getByText('Automation Flows');
      while (!(await automationFlows.isVisible())) {
          await page.mouse.wheel(0, 200);
      }
      automationFlows.click();
    }
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
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByTextByIndex("Clone - C32362_DND", 0);
    await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
    await io.assert.verifyElementDisplayedByText(
      "347 NS CONNECTION",
      "347 NS CONNECTION step is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "FTP",
      "FTP connection step is not displayed"
    );
    await io.assert.verifyElementDisplayedByText(
      "SALESFORCE CONNECTION",
      "SALESFORCE CONNECTION step is not displayed"
    );
  });
});
