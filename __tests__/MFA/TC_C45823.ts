import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45823 Verify if the save button is not shown for owner account in the MFA settings page.", () => {
    test("@Env-All @Zephyr-IO-T17232 C45823 Verify if the save button is not shown for owner account in the MFA settings page.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.homePage.loadingTime()
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.homePage.loadingTime()
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.homePage.loadingTime()
        await io.assert.verifyElementAttributeContainsText(selectors.basePagePO.MFA_SAVE, 'class', 'Mui-disabled');
    });
  });