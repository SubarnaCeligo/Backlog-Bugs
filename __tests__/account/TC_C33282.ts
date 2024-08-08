import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33282 Verify the checkbox named Show timestamps as relative is displayed below the Time format dropdown on their Profile section under My accounts.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test(`@Env-All @Zephyr-IO-T1463 C33282 Verify the checkbox named Show timestamps as relative is displayed below the Time format dropdown on their Profile section under My accounts.`, async({io,page}) => {
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.TIME_FORMAT, "Time format")
        await io.assert.verifyElementIsDisplayed(selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_CHECKBOX, "Show timestamps as relative")
        await io.assert.verifyElementAttributeContainsText(`${selectors.myAccountPagePO.SHOW_RELATIVE_DATE_TIME_ID} input`, 'type', 'checkbox');
    });
  })
