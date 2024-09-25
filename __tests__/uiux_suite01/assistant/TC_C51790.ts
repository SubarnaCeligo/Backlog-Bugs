import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51790 Verify 'Can't Find' Link under connection form when toggle is under simple`, () => {
  test(`@Env-All @Zephyr-IO-T18934 @Priority-P2 C51790 Verify 'Can't Find' Link under connection form when toggle is under simple`, async ({
    io,
    page
  }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "litmos"
    );
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.LITMOS_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.LITMOS_CONNECTION);
    await io.assert.verifyElementDisplayedByText(
      "Can't find?",
      "'Can't find?' link not displayed"
    );
  });
});
