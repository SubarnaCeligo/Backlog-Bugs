import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19150 'What's New' should be sentence cased.", () => {
    test("@Env-All @Zephyr-IO-T877 C19150 'What's New' should be sentence cased.   ", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.loadingTime()
      await io.homePage.click(selectors.homePagePO.HELPER_MENU)
      const whatsnewText = await io.homePage.isVisible(selectors.basePagePO.WHATS_NEW)
      await io.assert.expectToBeTrue(whatsnewText, "sentence case not found")
      
    });
  });