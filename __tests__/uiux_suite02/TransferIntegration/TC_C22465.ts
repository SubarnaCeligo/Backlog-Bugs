import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C22465 Verify the transfer date is correctly populated once the invite is accepted.`, () => {
  test(`C22465 Verify the transfer date is correctly populated once the invite is accepted.`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
    await page.waitForSelector("table");
    const att = await page.locator('a:has-text("Transfer Integration")');
    const secondDivElement = await att.locator("div:nth-child(-1)");
    const textContent = await secondDivElement.textContent();
    const timeRegex = /\d{1,2}:\d{2} [apm]{2}/i;
    const isValidTimeFormat = timeRegex.test(textContent);
    await io.assert.expectToBeTrue(isValidTimeFormat, "Invalid time format");
  });
});
