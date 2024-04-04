import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68897 Verify Audit Log and Users tab is visible to shared user having Administrator/Owner access", () => {
    test("@Env-All C568897 Verify Audit Log and Users tab is visible to shared user having Administrator/Owner access", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.PROFILE);
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.USERS, 'Users tab is not displayed');
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.AUDIT_LOG, 'Audit logs tab is not displayed')
    });
  });