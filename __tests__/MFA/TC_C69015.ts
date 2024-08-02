import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59015 My User section under MFA doesn't collapse properly.", () => {
    test("@Env-All @Zephyr-IO-T17131 C59015 My User section under MFA doesn't collapse properly.", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.assert.verifyElementAttributeContainsText(`:nth-match(${selectors.basePagePO.ACCORDION}, 1)`, 'aria-expanded','true');
        await io.myAccountPage.clickByIndex(`${selectors.basePagePO.ACCORDION_ICON}`, 0);
        await io.myAccountPage.delay(1000);
        const isEnableMFAVisible = await io.myAccountPage.isVisible('text="Enable MFA"') ;
        await io.assert.expectToBeValue('false', isEnableMFAVisible.toString(), 'My user did not collapse properly as Enable MFA is visible');
    });
  });