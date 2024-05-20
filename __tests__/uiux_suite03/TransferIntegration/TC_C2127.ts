import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./transfer.json";

test.describe(`C2127 Verify Transfer list must be updated with lastmodified at top for done,dismiss and cancel actions`, () => {
  test(`@Env-All @Zephyr-IO-T6920 C2127`, async ({
    page,
    io
  }) => {
    const res = await io.api.postCall(`v1/transfers/invite`, testData);
    let data = await io.api.putCall(`v1/transfers/${res._id}/cancel`, {});
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER);
    
    await page.waitForSelector("table");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    let tbl;
    tbl = (await page.$$("table tr td"));
    let table = page.$$("table tr td")
    let result = false
    for (let i = 0; i < tbl.length - 1; i++) {
      const cellText = await tbl[i].textContent();
      console.log("this is  status ", cellText);
      if (cellText === "Canceled") {
        result = true
        break;
      }
    }

    expect(result).toBeTruthy();

  });
});
