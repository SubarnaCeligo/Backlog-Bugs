import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C2148 Verify the 4 options under 'Help' must navigate to correct pages.", () => {
    test("@Env-All @Zephyr-IO-T869 C2148 Verify the 4 options under 'Help' must navigate to correct pages.", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.loadingTime()
        await io.homePage.addStep('clicking on Help to see sub options');
        await io.homePage.click(selectors.homePagePO.HELPER_MENU);
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HELP_CENTER, 'Help center page link not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.COMMUNITY, 'Community page link not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.WHATS_NEW, 'Whats new page link not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT_A_TICKET, 'Submit a ticket page link not displayed');
    });
  });