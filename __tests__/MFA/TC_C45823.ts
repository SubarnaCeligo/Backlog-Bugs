import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45823 Verify if the save button is not shown for owner account in the MFA settings page.", () => {
    test("@Env-QA C45823 Verify if the save button is not shown for owner account in the MFA settings page.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.assert.verifyElementAttributeContainsText(selectors.basePagePO.MFA_SAVE, 'class', 'Mui-disabled');
    });
  });