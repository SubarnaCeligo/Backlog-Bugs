import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C58592 Verify if the new Data retention tab is added to the My account page and all the fields in the tab along with the help text", () => {
    test("@Env-All C58592 Verify if the new Data retention tab is added to the My account page and all the fields in the tab along with the help text", async ({io, page}) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
        await io.myAccountPage.click(selectors.myAccountPagePO.DATA_RETENTION);
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.DATA_RETENTION_PERIOD, 'Data Retention Period not displayed');
        await io.myAccountPage.click(`${selectors.myAccountPagePO.DATA_RETENTION_PERIOD_ID} .MuiIconButton-root`);
        await io.assert.verifyElementText(selectors.myAccountPagePO.DATA_RETENTION_HELP_TEXT,'Select the number of days to store data.  Changing the retention period will apply to new data only. Data retained before a retention period change will continue to expire based on the retention period defined at the time of retention.Learn more about data retention.');
    });
  });