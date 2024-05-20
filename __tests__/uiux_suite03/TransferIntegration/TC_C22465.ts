import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C22465 Verify the transfer date is correctly populated once the invite is accepted.`, () => {
  test(`@Env-All @Zephyr-IO-T6960 C22465`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
    await page.waitForSelector("table");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    let tbl;
    tbl = (await page.$$("table tr td"));
    let table = page.$$("table tr td")
    let getData = 0;
    for (let i = 0; i < tbl.length - 1; i++) {
      const cellText = await tbl[i].textContent();
      console.log("this is  status ", cellText);
      if (cellText === "Accepted") {
        getData = i
        break;
      }
    }
    const cellText = await tbl[getData + 1].textContent();
    const timeRegex = /\d{1,2}\/\d{1,2}\/\d{4} \d{2}:\d{2}:\d{2}/;
    const isValidTimeFormat = timeRegex.test(cellText);
    await io.assert.expectToBeTrue(isValidTimeFormat, "Invalid time format");
  });
});
