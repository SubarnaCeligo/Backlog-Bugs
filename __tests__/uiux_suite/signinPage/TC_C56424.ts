import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C56424 Verify if the page is refreshed and if the session is not expired we should be staying on the same page as before", () => {
    test("C56424 Verify if the page is refreshed and if the session is not expired we should be staying on the same page as before", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES); 
        await page.reload();
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.INTEGRATION_TILES, 'Did not land to homepage on reload');
    });
  });