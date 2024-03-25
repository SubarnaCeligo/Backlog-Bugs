import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("CONNECTIONS", () => {
  test("C63027 Verify help text for multi-type API connections", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'narvar');
    await page.keyboard.press("Enter");
    await io.flowBuilder.click(selectors.connectionsPagePO.API_TYPE_HELP_BUBBLE);
    const helpBubble = await page.$(selectors.myAccountPagePO.HELP_BUBBLE);
    const text = await helpBubble.innerText();
    expect(text).toContain("This application supports multiple APIs. Select the specific API you would like to use for this connection.");
  });
});
