import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T3023|To verify 'Custom' label along with flow count is displayed under 'Type' column if it is an DIY/Standalone tile", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T3023|To verify 'Custom' label along with flow count is displayed under 'Type' column if it is an DIY/Standalone tile", async ({io,page}, testInfo) => {
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    test.step("Clicked on list view.", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "T3015_IA_DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
    test.step("Entered value in search area.", async ()=>{});
    const statusButton = await page.locator("tr:nth-child(1) > td:nth-child(5)");
    const label = await statusButton.textContent();
    expect(label).toBe('Custom 0 Flows');
await test.step(
      "'C32992': Custom label along with flow count is displayed under 'Type' column if test is an DIY/Standalone tile."
, async ()=>{});
  });
});
