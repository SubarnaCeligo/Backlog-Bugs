import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C58307 There should not be any error when Data retention page is refreshed", () => {
    test("@Env-All C58307 There should not be any error when Data retention page is refreshed", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.addStep('click on data retention tab');
        await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION);
        await io.myAccountPage.addStep('Reloading page and checking ');
        await io.myAccountPage.reloadPage();
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DATA_RETENTION_PERIOD, 'Not reloaded properly');
    });
  });