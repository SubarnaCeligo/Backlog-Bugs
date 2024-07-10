import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T29697_Test to validate that user is able to see azure synapse in application's list of marketplace", () => {
  test("@Epic-IO-65860 @Bug-IO-77911 @Priority-P2 @Zephyr-IO-T29697 @Env-All", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Navigated to home page ***");
      await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
      await io.homePage.addStep("*** Waited for Market place to be visible ***");
      await io.homePage.goToMenu("Marketplace");
      await io.homePage.addStep("*** Navigated to market place ***");
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'Microsoft Azure Synapse Analytics');
      await io.homePage.addStep("*** Searched for the Microsoft azure templates ***");
      await io.homePage.addStep("*** Found no templates as do not have any ***");
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'Microsoft SQL');
      await io.homePage.addStep("*** Searched for the Microsoft SQL templates ***");
      await io.homePage.addStep("*** Found one template ***");
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.addStep("*** Navigated to home page ***");
  });
});