import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C119138", () => {
  test("@Env-All @Zephyr-IO-TC119138", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "NETSUITE"
    );
    await io.flowBuilder.loadingTime();
    await page.waitForTimeout(10000);
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.WSDLVERSION);
    await io.flowBuilder.click(selectors.connectionsPagePO.VERSION2023);
    await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_AUTH);
    await io.assert.expectNotToBeValue(
      selectors.flowBuilderPagePO.NSBASIC,
      "",
      "Basic Auth not displayed"
    );
  });
});
