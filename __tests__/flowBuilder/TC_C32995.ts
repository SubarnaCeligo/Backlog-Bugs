import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C32995", () => {
  test("@Env-All @Zephyr-IO-T3026| To verify pinned integration should remain unchanged after sorting a column", async ({ io, page }) => {

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill('32983_DND');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    for (let k = 0; k < 2; k++) {
      console.log(k);
      await io.homePage.clickButtonByIndex(
        selectors.integrationPagePO.OPENACTIONSMENU,
        k
      );
      await io.homePage.click(
        selectors.integrationPagePO.PIN_INTEGRATION
      );
    }
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
     await io.homePage.loadingTime();
    await io.homePage.clickByText('Last open error');
    await io.homePage.loadingTime();
    const cell1 = await io.homePage.getText('table>tbody>tr:nth-child(1)>th:nth-child(1)');
    expect(cell1).toContain('32983_DND');
    await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill('32983_DND');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await io.homePage.click(selectors.integrationPagePO.UNPIN_INTEGRATION);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await io.homePage.click(selectors.integrationPagePO.UNPIN_INTEGRATION);

  });
});
