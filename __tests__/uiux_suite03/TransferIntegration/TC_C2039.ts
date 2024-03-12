import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C2039 TC Summary : Verify the transfered date is shown correctly after accepting the integration.`, () => {
  test(`C2039 TC Summary : Verify the transfered date is shown correctly after accepting the integration.`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
    const date = await page
      .getByText("Accepted", { exact: true })
      .first()
      .evaluate((el: HTMLTableCellElement) => {
        const sibling = el.nextElementSibling;
        const date = sibling.textContent;
        return date;
      });
    await io.assert.expectNotToBeValue(date, "", "Date is not displayed");
    await io.myAccountPage.addStep("Verify the date is displayed correctly");
  });
});
