import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2600_sortingExports_byClicking_onColumnHeader_inTables", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Zephyr-IO-T2502 @Env-All TC_C2600_sortingExports_byClicking_onColumnHeader_inTables", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Navigated to list of exports ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var loadMore = await(await page.locator(selectors.integrationPagePO.LOAD_MORE)
    ).isVisible();
    if(loadMore === true) {
      while(await ( await page.locator(selectors.integrationPagePO.LOAD_MORE)
        ).isVisible()
      ) {
        await io.homePage.click(selectors.integrationPagePO.LOAD_MORE);
      }
    }
 
   
    test.step("*** Clicking on column headers to sorts the list of exports in ascending order ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickByText("Name/Description");

    var loc = await page.locator(selectors.basePagePO.EXPORTSLIST);

    test.step("*** Applying ascending sorting algorithm to verify exports list is sorted ***", async ()=>{});
    let sortExpor = await io.homePage.findElementsAreInSortedFormOrNot(loc);
    await await io.assert.expectToBeFalse(sortExpor, "");

    test.step("*** Verified The list of exports are sorted in ascending when clicked on the column headers once ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicking on column headers to sorts the list of exports in descending order ***", async ()=>{});
    var loc1 = await page.locator(selectors.basePagePO.EXPORTSLIST);
    test.step("*** Applying descending sorting algorithm to verify exports list is sorted ***", async ()=>{});
    let sortExports = await io.homePage.sortingIndescendingOrder(loc1);
    await await io.assert.expectToBeTrue(sortExports, "");
    test.step("*** Verified The list of exports are sorted in descending when clicked on the column headers twice ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to HomePage ***", async ()=>{});
  });
});
