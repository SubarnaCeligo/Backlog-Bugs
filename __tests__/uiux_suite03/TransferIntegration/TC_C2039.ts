import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C2039 TC Summary : Verify the transfered date is shown correctly after accepting the integration.`, () => {
  test(`@Env-All @Zephyr-IO-T6917 C2039`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const data = await page.$$eval('td', (elements) => {
      return elements
        .filter((el: HTMLTableCellElement) => el.textContent === 'Accepted')
        .map((el: HTMLTableCellElement) => {
          const sibling = el.nextElementSibling;
          const date = sibling.textContent;
          return date;
        });
    });
    await io.assert.expectNotToBeValue(data.toString(), "", "Date is not displayed");
    await io.myAccountPage.addStep("Verify the date is displayed correctly");
  });
});
