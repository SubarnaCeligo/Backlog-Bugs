import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C58307 There should not be any error when Data retention page is refreshed", () => {
    test("C58307 There should not be any error when Data retention page is refreshed", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click('[data-test="Data retention"]');
        await page.reload();
        await io.assert.verifyElementIsDisplayed('[data-test="dataRetentionPeriod"]', 'Not reloaded properly');
    });
  });