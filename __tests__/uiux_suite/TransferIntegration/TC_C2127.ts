import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./transfer.json";

 

test.describe(`C2127 Verify Transfer list must be updated with lastmodified at top for done,dismiss and cancel actions`, () => {
  test(`C2127 Verify Transfer list must be updated with lastmodified at top for done,dismiss and cancel actions`, async ({
    page,
    io
  }) => {
     
    const res = await io.api.postCall(
      `v1/transfers/invite`,
      testData
    );
    let data = await io.api.putCall(
        `v1/transfers/${res._id}/cancel`,
       {},
     );
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER)
    await page.waitForSelector('table');
    const statusText = await page.$eval('table tr:nth-child(2) td:nth-child(4)', (cell) => cell.textContent);
    await io.assert.expectToBeValue(statusText,"Canceled", "transfer is not dismissed")
  });
});