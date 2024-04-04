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
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click('[id="http._httpConnectorApiId"] Button');
    await io.assert.verifyElementDisplayedByText("This application supports multiple APIs. Select the specific API you would like to use for this connection.", "Text not showing")
  });
});
