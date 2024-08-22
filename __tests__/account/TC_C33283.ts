import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
test.describe(`C33283 Verify the help text of the new checkbox named Show timestamps as relative is displayed correctly.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test(`@Env-All @Zephyr-IO-T1464 C33283 Verify the help text of the new checkbox named Show timestamps as relative is displayed correctly.`, async({io,page}) => {
         await io.myAccountPage.click(selectors.integrationPagePO.RELATIVE_DATE_TIME_HELP_BUTTON)
         await io.homePage.loadingTime()
         await io.assert.verifyElementContainsText(selectors.myAccountPagePO.HELP_BUBBLE,"Check this box to view the amount of time elapsed since an event occurred, such as 1 hour ago or 1 day ago. Otherwise, the display format is absolute, such as 2021-10-25 7:47:33 PM.")
    });
  })