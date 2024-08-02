import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C58036 Verify when we refresh the page when there is an open create license drawer, the drawer should be closed on the refresh", () => {
  test("@Env-All @Zephyr-IO-T17137 C58036 Verify when we refresh the page when there is an open create license drawer, the drawer should be closed on the refresh", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.homePage.goToMenu("Resources", "Integration apps");

      await io.homePage.click(`tbody tr:has-text('IA_DND') ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
      await io.homePage.click(selectors.homePagePO.LICENSES);
      await io.homePage.clickByText('New license');
      await page.reload();

      await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
      const isSaveNotVisible = !await io.homePage.isVisible(selectors.basePagePO.SAVE);
      await io.assert.expectToBeTrue(isSaveNotVisible, 'The form is still visible');
  });
});