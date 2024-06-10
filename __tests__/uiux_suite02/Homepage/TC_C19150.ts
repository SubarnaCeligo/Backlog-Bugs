import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19150 'What's New' should be sentence cased.", () => {
    test.skip("C19150 'What's New' should be sentence cased.   ", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.hover(selectors.basePagePO.HELP)
      const whatsnewText = await io.homePage.isVisible("text='What\'s new'")
      await io.assert.expectToBeTrue(whatsnewText, "sentence case not found")
      
    });
  });