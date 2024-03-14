import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe("C68993 Verify error message is not displayed on adding 'Number of days until MFA is required again for trusted devices' while setting MFA", () => {
    test("C68993 Verify error message is not displayed on adding 'Number of days until MFA is required again for trusted devices' while setting MFA", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '1');
        await io.myAccountPage.fill(selectors.myAccountPagePO.TRUSTED_DEVICE_FOR_PERIOD_INPUT, '2');
        await io.myAccountPage.click(selectors.basePagePO.MFA_SAVE);
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.NOTIFICATION_ID, 'Notification not being displayed');
        await io.assert.verifyElementText(selectors.basePagePO.NOTIFICATION_ID, 'MFA account settings saved successfully.');
    });
  });