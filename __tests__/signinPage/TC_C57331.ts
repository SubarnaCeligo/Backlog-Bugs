import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C57331 Verify if the shared user has not setup the MFA to his account he should be navigated to the MFA setup page on login", () => {
    test("C57331 Verify if the shared user has not setup the MFA to his account he should be navigated to the MFA setup page on login", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.basePagePO.NOTIFICATION_ID);
        await io.assert.verifyElementContainsText(`${selectors.basePagePO.NOTIFICATION_ID} p`, 'You are required to enable MFA before you can continue in this account.');
    });
});