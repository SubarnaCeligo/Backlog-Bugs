import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

function isValidDateTimeFormat(dateTimeString) {
  const dateTimePattern = /^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}:\d{2} (am|pm)$/i;
  return dateTimePattern.test(dateTimeString);
}

test.describe("C19911 Verify for each step the completed time should display as per the timezone selected in the profile", () => {
    test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    });
    test("C19911 @Env-All @Zephyr-IO-T6229", async ({ io, page }) => {
        await io.homePage.addStep("*** Navigated to integrations page ***");
        await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
        await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'C19911_DND');
        await io.integrationPage.clickByText('C19911_DND');
        await io.integrationPage.loadingTime();
        await io.integrationPage.click(selectors.basePagePO.RUNFLOW);
        await page.waitForFunction(
          () => {
            const element: HTMLDivElement = document.querySelector(
              "[aria-label='relative date time']"
            );
            return Boolean(element);
          },
          { timeout: 1200000 }
        );
        const timeString = await (await page.$(selectors.myAccountPagePO.RELATIVE_DATE_TIME)).evaluate(el => el.textContent);
        expect(isValidDateTimeFormat(timeString)).toBeTruthy();
    });
});