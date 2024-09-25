import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C64882 verify toggle button for iclient under connection`, () => {
  test(`@Env-All @Zephyr-IO-T17566 C64882 verify toggle button for iclient under connection`, async ({
    io,
    page
  }) => {
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.click(selectors.connectionsPagePO.GUSTO_CONNECTION);
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_ICLIENT);
    await io.assert.verifyElementIsDisplayed(
      selectors.importPagePO.HTTP_IMPORT,
      "HTTP form switch is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH,
      "Simple form switch is not displayed"
    );
  });
});
