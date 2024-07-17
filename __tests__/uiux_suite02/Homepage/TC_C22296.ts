import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22296_Verify market place tiles in different browsers", () => {
  test("@Env-All @Zephyr-IO-T2174 C22296_Verify market place tiles in different browsers UI_Backlog", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime()
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
      await io.homePage.goToMenu("Marketplace");
      await io.homePage.loadingTime()
     // Validating title showing correctly
     await io.assert.verifyElementDisplayedByText('Popular Integration Apps and Templates', "Not showing correctly")
     
  });
});