import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "./transfer.json";

 

test.describe(`C22464 Verify the values in columns are refreshed when the invite is accepted/rejected.`, () => {
  test(`C22464 Verify the values in columns are refreshed when the invite is accepted/rejected.`, async ({
    page,
    io
  }) => {
     
    const res = await io.api.postCall(
      `v1/transfers/invite`,
      testData
    );

    console.log(res, 'response')
    const res1 = await io.api.putCall(
        `v1/transfers/${res._id}/dismiss`,
        res._id
     );
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.click(selectors.homePagePO.TRANSFER)
    await page.waitForSelector('table');
    const statusText = await page.$eval('table tr:nth-child(2) td:nth-child(4)', (cell) => cell.textContent);
    await io.assert.expectToBeValue(statusText,"Dismissed", "transfer is not dismissed")
    
  });
});