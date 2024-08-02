import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C77923 To verify that the user is able to create new connections while cloning, installing templates.", () => {
  test("@Env-All @Zephyr-IO-T4733 C77923 To verify that the user is able to create new connections while cloning, installing templates.", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
      await io.homePage.goToMenu("Marketplace");
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'C2397_DND');
      await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
      await io.homePage.clickByText("Install now");
      await io.homePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
      await io.homePage.clickByIndex(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON, 0);
      await io.assert.verifyElementIsDisplayed(selectors.integrationPagePO.SELECT_TYPE, 'What would you like to do options not available');
      await io.assert.verifyElementIsDisplayed(selectors.integrationPagePO.NEW_OPTION, 'New connection option not available');
      await io.assert.verifyElementContainsText(selectors.integrationPagePO.NEW_OPTION, 'Set up new connection');
  });
});