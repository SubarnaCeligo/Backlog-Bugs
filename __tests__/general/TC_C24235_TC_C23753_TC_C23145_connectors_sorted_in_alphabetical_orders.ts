import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber, traverseThroughoutArrayToCheck} from "@celigo/aut-utilities";


test.describe("TC_C24235_TC_C23753_TC_C23145", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2176 @Zephyr-IO-T2177 @Zephyr-IO-T5965 TC_C24235_TC_C23753_TC_C23145", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(process.env['IO_UI_CONNECTOR_URL'] + 'marketplace');
    await io.homePage.loadingTime();
    await io.homePage.click('[data-test="All applications"]')
    var loc = await page.$$('[id*="checkbox-list-label"] span');
    const list = await Promise.all(loc.map(async (el) => (await el.textContent()).toUpperCase()));
    let flag = true;  
    for (let i = 0; i < 50; i++) {
      if (list[i] > list[i + 1]) {
        flag = false;
      }
    }
    await io.assert.expectToBeTrue(flag, "");
     
     
    flag = false;
    for(let i = 0; i < list.length; i++) {
      if(list[i] == "CONCUR EXPENSE" || list[i] == "CONCUR INVOICE" ) {
        flag = true;
        break;
      }
    }
    
    await io.assert.expectToBeTrue(flag, "");

    await io.homePage.click(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
 
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "3DBinPacking");
    await io.homePage.isPageReady();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    const text = await page.getByText('We could not find anything').textContent();
    await io.assert.expectToContainValue(`We could not find anything related to '3DBinPacking'...`, text, "");

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
