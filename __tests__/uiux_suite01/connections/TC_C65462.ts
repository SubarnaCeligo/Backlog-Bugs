import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65462 Verify routing rules", () => {
  test("@Env-All @Zephyr-IO-T21538 C65462 Verify routing rules", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'van');
      await io.flowBuilder.click(selectors.connectionsPagePO.VAN_CONNECTION);
      await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
      await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.CREATE_SELECT_CONNECTION)
      await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
      await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN,'VAN CONNECTION');
      await io.flowBuilder.clickByText('VAN CONNECTION');
      await io.flowBuilder.click(selectors.basePagePO.SAVE);
      await io.flowBuilder.fill(selectors.importPagePO.NAME,'van_test_export')
      await io.flowBuilder.click(selectors.connectionsPagePO.VAN_FILE_TYPE);
      await io.flowBuilder.click(selectors.connectionsPagePO.FILE_DEFINITION);
      await io.flowBuilder.click(selectors.connectionsPagePO.EDIX12_FORMAT);
      await io.flowBuilder.click(selectors.connectionsPagePO.LUMBEREDI810);
      await io.flowBuilder.waitForElementAttached('button:has-text("Launch")');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime()
      await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.AS2_ROUTING)
      await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AS2_ROUTING, 'Routing icon not visible on export');
  });
});