import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C93548 To verify that the there should not be an empty click between create and upload drop down", () => {
  test("C93548 To verify that the there should not be an empty click between create and upload drop down @Zephyr-IO-T8126 @Env-All @Priority-P2", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.homePagePO.TILE_VIEW);
      await io.homePage.click('button:has-text("Create")');
      await io.assert.verifyElementIsDisplayed(selectors.homePagePO.CREATEFLOW, 'Flow option not visible');
      await io.assert.verifyElementIsDisplayed(selectors.homePagePO.CREATE_CONNECTION, 'Create connection option not visible');
      await io.assert.verifyElementIsDisplayed(selectors.homePagePO.CREATE_NEW_INTEGRATION, 'New Integration option not visible');
      await io.homePage.click('button:has-text("Upload")');
      await io.assert.verifyElementIsDisplayed(selectors.homePagePO.INSTALL_ZIP, 'Install zip option not visible');
  });
});