import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C56424 Verify if the page is refreshed and if the session is not expired we should be staying on the same page as before", () => {
    test("@Env-All @Zephyr-IO-T17007 C56424 Verify if the page is refreshed and if the session is not expired we should be staying on the same page as before", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.INTEGRATION_TILES); 
        await io.homePage.reloadPage();
        await io.assert.verifyElementIsDisplayed(selectors.homePagePO.INTEGRATION_TILES, 'Did not land to homepage on reload');
    });
  });