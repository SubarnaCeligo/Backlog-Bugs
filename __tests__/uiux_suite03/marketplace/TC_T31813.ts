import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify sub-sections under 'Frequently Selected App' and 'All Apps' are frozen", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T31813 Verify sub-sections under 'Frequently Selected App' and 'All Apps' are frozen", async ({ io, page }) => {

    //Go to Marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);
    await io.marketplacePage.loadingTime();
    await io.marketplacePage.clickByTextByIndex('By type', 0);

    //Verify By application and By group are frozen
    let parentDiv = page.locator(selectors.marketplacePagePO.MARKETPLACE_SUBSECTIONS).locator('..');
    expect(await parentDiv.screenshot()).toMatchSnapshot("FrozenSections1.png",  {maxDiffPixelRatio: 0.8 });

    //Verify By application and By type are frozen
    await io.marketplacePage.clickByTextByIndex('By group', 0);
    parentDiv = page.locator(selectors.marketplacePagePO.MARKETPLACE_SUBSECTIONS).locator('..');
    expect(await parentDiv.screenshot()).toMatchSnapshot("FrozenSections2.png",  {maxDiffPixelRatio: 0.8 });

  });
});