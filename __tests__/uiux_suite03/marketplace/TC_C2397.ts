import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C2397 Marketplace Install button should be greyed out for non-permitted users", () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("Copy C2397_DND", "_id");
    await io.api.deleteIntegration(intId);
  });
  test("@Env-All @Zephyr-IO-T2161 C2397 Marketplace Install button should be greyed out for non-permitted users", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
      await io.homePage.goToMenu("Marketplace");
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'C2397_DND');
      await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
      await io.homePage.clickByText("Install now");
      await io.assert.verifyElementText(selectors.basePagePO.NOTIFICATION, 'Users with monitor or tile level manage permissions cannot install templates. Ask an account owner or administrator to increase your permissions, or contact another user with at least account level manage permissions to install the template.')
  });
});