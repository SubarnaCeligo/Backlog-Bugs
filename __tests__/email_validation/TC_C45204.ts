import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C45204 Verify list of Accounts dropdown beside profile icon", () => {
    test("C45204 Verify list of Accounts dropdown beside profile icon", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.ORG_CHANGE_DROPDOWN);
        const allOptions = await page.locator(selectors.homePagePO.ORG_CHANGE_LIST).all();
        const allOptionsText = [];
        for(let i=0; i<allOptions.length; i++){
         allOptionsText.push(await allOptions[i].innerText());
        }
        function checkSorted(arr) { 
          const sortArr = [...arr].sort((a, b) => a - b); 
          return JSON.stringify(arr) === JSON.stringify(sortArr); 
        } 
        await io.assert.expectToBeTrue(checkSorted(allOptionsText), 'The flows are not sorted');
    });
  });