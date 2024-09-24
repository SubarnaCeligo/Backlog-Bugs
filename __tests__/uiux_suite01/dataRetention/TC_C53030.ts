import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53030 Verify that the 30 days option is enable for for license type is of Free tier, Free trial, Standard subscriptions", () => {
    test("@Env-All @Zephyr-IO-T14551 C53030 Verify that the 30 days option is enable for for license type is of Free tier, Free trial, Standard subscriptions", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION);
        await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION_PERIOD);
        await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.THIRTY_DAYS, 'class', 'Mui-selected');
        await io.assert.verifyElementText(selectors.myAccountPagePO.THIRTY_DAYS, '30 days');
        await io.assert.verifyElementText(selectors.myAccountPagePO.SIXTY_DAYS, '60 days');
        await io.assert.verifyElementText(selectors.myAccountPagePO.NINETY_DAYS, '90 days');
        await io.assert.verifyElementContainsText(selectors.myAccountPagePO.ONEEIGHTY_DAYS, '180 days');
    });
  });