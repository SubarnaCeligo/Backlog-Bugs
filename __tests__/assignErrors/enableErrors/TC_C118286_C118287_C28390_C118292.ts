import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C118286_C118287_C28390_C118292", () => {
    test("@Env-All -IO-T20099 @Zephyr-IO-T20100 @Zephyr-IO-T888 @Zephyr-IO-T20105 TC_C118286_C118287_C28390_C118292", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.SECURITY);
        await io.homePage.waitForElementAttached(selectors.basePagePO.BREADCRUMB);
        const breadcrumbList = await page.locator(selectors.basePagePO.BREADCRUMB_LIST).all();
        await io.homePage.addStep('Checking the breadcrumb texts and length');
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},1)`, 'Home');
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},3)`, 'My account');
        await io.myAccountPage.click(selectors.myAccountPagePO.MFA);
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},7)`, 'MFA');
        await io.myAccountPage.click(selectors.myAccountPagePO.SSO);
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},7)`, 'SSO');
        await io.myAccountPage.click(selectors.homePagePO.INVITATION_TAB);
        await io.assert.verifyElementText(`:nth-match(${selectors.basePagePO.BREADCRUMB_LIST},7)`, 'Invitations');

          await io.assert.verifyElementDisplayedByText(
            `This will also allow non-admins to assign errors from their integrations to users who currently don’t have access to that integration.`,
            "The text looks work"
          )
        });
    });