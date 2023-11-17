import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
 
test.describe("C22227 Marketplace: Verify the image is present below the title", () => {
    test("C22227 Marketplace: Verify the image is present below the title ", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
      await io.homePage.clickByText("Marketplace")
      await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, "Salesforce - NetSuite (IO) ")
      await page.waitForSelector('[alt="netsuite"]', { state: 'visible' });
      await io.assert.checkSnapshot(selectors.basePagePO.CONNECTION_DROPDOWN,"TC_C22227.png") 
    });
  });