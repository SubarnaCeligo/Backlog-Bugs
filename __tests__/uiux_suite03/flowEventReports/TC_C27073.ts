import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C27073 In Run report drawer the Flows list should be Alpha sorted", () => {
    test("@Env-All @Zephyr-IO-T4365 C27073 In Run report drawer the Flows list should be Alpha sorted", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.homePage.goToMenu("Tools", "Reports");
      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.homePage.click(selectors.homePagePO.INTEGRATION);
      await page.getByRole("menuitem").nth(1).click();
      await io.homePage.clickByText('Choose flows');
      const allOptions = await page.locator(selectors.homePagePO.REPORT_AUTOMATION_FLOWS_OPTION).all();
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