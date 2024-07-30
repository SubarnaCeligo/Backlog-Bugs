import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T23721 Verify IA/Template logo is showing properly in placeholder.", () => {
  test.describe.configure({ retries: 2 })
  test("@Priority-P3 @Zephyr-IO-T23721 @Env-All Verify IA/Template logo is showing properly in placeholder.", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'Magento 2 - NetSuite');
    await io.homePage.loadingTime();
    await io.homePage.clickByText("By type");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.marketplacePagePO.INTEGRATION_APP_TYPE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    const Symbol1 = await page.$(selectors.marketplacePagePO.MAGENTO_APP_IMAGE);
    expect(await Symbol1.screenshot()).toMatchSnapshot("TC_T23721.png");
    await io.homePage.click(selectors.marketplacePagePO.TEMPLATE_TYPE);
    await io.homePage.loadingTime();
    const Symbol2 = await page.$(selectors.marketplacePagePO.MAGENTO_APP_IMAGE);
    expect(await Symbol2.screenshot()).toMatchSnapshot("TC_T23721.png");
  });
});