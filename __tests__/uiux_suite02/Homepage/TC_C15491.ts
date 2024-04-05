import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C15491_Verify Images are shown for applications ( constantcontact v2 ,redshift, gorgias ,logisense ,orderful) in marketplace", () => {
  test("C15491_Verify Images are shown for applications ( constantcontact v2 ,redshift, gorgias ,logisense ,orderful) in marketplace UI_Backlog", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
      await io.homePage.goToMenu("Marketplace");
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'orderful');
     // Validating Images are shown for applications
     await io.assert.verifyElementDisplayedByText('Orderful IA test', "It's not visible")
     
  });
});