import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33282 Verify the checkbox named Show timestamps as relative is displayed below the Time format dropdown on their Profile section under My accounts.`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      });
    test(`C33282 Verify the checkbox named Show timestamps as relative is displayed below the Time format dropdown on their Profile section under My accounts.`, async({io,page}) => {
        await io.assert.verifyElementIsDisplayed('[for="timeFormat"]', "Time format")
        await io.assert.verifyElementIsDisplayed("[data-test='showRelativeDateTime']", "Show timestamps as relative")
        await io.assert.verifyElementAttributeContainsText(`#showRelativeDateTime input`, 'type', 'checkbox');
    });
  })
