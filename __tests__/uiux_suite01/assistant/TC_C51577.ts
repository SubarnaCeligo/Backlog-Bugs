import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51577 Verify connection form base URI while installing IAs/templates", () => {
  test("@Env-All @Zephyr-IO-T18906 @Priority-P2 C51577 Verify connection form base URI while installing IAs/templates", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
      await io.homePage.goToMenu("Marketplace");
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'HTTP_DND');
      await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
      await io.homePage.clickByText("Install now");
      await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
      await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.HTTP_BASE_URI, 'Base URI is not displayed');
     
  });
});