import {test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {decrypt} from "@celigo/aut-utilities";
import { generateOTP } from "@celigo/aut-utilities";

test.describe("C45822 Verify if the  messages are shown correctly on the screen when the MFA is enabled for the first time/ enabling MFA after it has been reset for the user.", () => {
    test.skip("@Env-All @Zephyr-IO-T17231 C45822 Verify if the  messages are shown correctly on the screen when the MFA is enabled for the first time/ enabling MFA after it has been reset for the user.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.myAccountPage.click(selectors.basePagePO.OFF_ON);
        await io.myAccountPage.clickByText('View account & secret key');
        await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
        await io.myAccountPage.click(selectors.myAccountPagePO.REAUTH);
        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.PARAGRAPH_BOX);
        const secretKey = await (page.locator(selectors.myAccountPagePO.PARAGRAPH_BOX).nth(2)).innerText();
        const otp = generateOTP((secretKey.split(': ')[1]).toString());
        await io.myAccountPage.fill(selectors.myAccountPagePO.MOBILE_CODE, otp);
        await io.myAccountPage.click(selectors.myAccountPagePO.VERIFY);
        await io.myAccountPage.click(selectors.myAccountPagePO.ALLOW_RESET_BY_USERID);
        await io.myAccountPage.clickByIndex(`${selectors.basePagePO.LIST_BOX} li`, 1);
        await io.myAccountPage.clickByText('Connect');
        await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION, 'MFA enabled and device connected successfully.');
        await io.myAccountPage.clickByText('Reset');
        await io.myAccountPage.click(selectors.basePagePO.RESET);
        await io.myAccountPage.fill(selectors.basePagePO.NEW_PASSWORD, decrypt(process.env["IO_Password"]));
        await io.myAccountPage.click(selectors.myAccountPagePO.RESET_MFA);
    });
  });