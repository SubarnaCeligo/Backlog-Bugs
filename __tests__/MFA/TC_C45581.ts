import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45581 Verify if the IO account user is able to view the option to enable MFA settings under the Security tab.", () => {
    test("@Env-All @Zephyr-IO-T17223 C45581 Verify if the IO account user is able to view the option to enable MFA settings under the Security tab.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.assert.verifyElementDisplayedByText('Enable MFA', 'Enable MFA not visible');
        const isToggleEnable = await io.myAccountPage.isVisible(`${selectors.myAccountPagePO.MFA_ON_OFF} .react-toggle--checked`);
        if(isToggleEnable) await io.myAccountPage.click(`${selectors.myAccountPagePO.MFA_ON_OFF} .react-toggle--checked`);
        const isResetMFAVisible = await io.myAccountPage.isVisible(':has-text("Get verification app")');
        const isQrCodeVisible = await io.myAccountPage.isVisible(':has-text("Add integrator.io")');
        const isSecretKeyVisible = await io.myAccountPage.isVisible(':has-text("Verify mobile device")');
        await io.assert.expectToBeValue('false', isResetMFAVisible.toString(), 'Get verification app is displayed');
        await io.assert.expectToBeValue('false', isQrCodeVisible.toString(), 'Add integrator.io is displayed');
        await io.assert.expectToBeValue('false', isSecretKeyVisible.toString(), 'Verify mobile device is displayed');
    });
  });
