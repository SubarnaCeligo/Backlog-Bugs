import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C53073 Verify the "Data retention up to 180 days" field is added in the subscriptions page under the features included section for a free tier account', () => {
   
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
     
    test('@Env-All @Zephyr-IO-T14559 C53073 Verify the "Data retention up to 180 days" field is added in the subscriptions page under the features included section for a free tier account', async ({
      io,
      page
    }) => {
    await io.myAccountPage.click(selectors.myAccountPagePO.SUBSCRIPTION);
 
 await io.assert.verifyElementDisplayedByText(
    "Data retention up to 180 days",
    "Data retention message is not displayed"
     
    );
     
    });
});