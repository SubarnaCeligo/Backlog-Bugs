import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Zephyr-IO-T3020 @Env-All", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T3020 @Env-All", async ({io, page}) => {
    test.step("*** Clicking on list view ***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    test.step("*** Searching for suitescript tile ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON + " input",
      "Salesforce"
    );
    await io.homePage.loadingTime();
    await expect(page.getByText('Last open error')).toBeVisible;
  });
});
