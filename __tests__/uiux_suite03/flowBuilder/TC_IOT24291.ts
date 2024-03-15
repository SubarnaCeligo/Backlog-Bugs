import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT4291 Test to verify Clicking on 'Show more' is displaying 25 results each time`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("IOT4291", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Create");
        await io.homePage.click(selectors.homePagePO.CREATEFLOW);
        await io.flowBuilder.clickAddSource();
        await io.flowBuilder.waitForElementAttached("text='Marketplace flow steps'");
        await io.assert.verifyElementIsDisplayed("text='Marketplace flow steps'", 'Marketplace flow steps header is not present before application selection');
        expect(await page.getByText('What would you like to do? *')).not.toBeVisible();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
        expect(await page.getByText('What would you like to do? *')).toBeVisible();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES);
        const dataMarketplaceResourcesCount = await page.locator(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES).count();
        expect(await (await io.flowBuilder.findElementByDataTest("marketplaceResourcesShowMore")).textContent()).toEqual('Show more');
        (await io.flowBuilder.findElementByDataTest("marketplaceResourcesShowMore")).click();
        await io.flowBuilder.waitForElementAttached("text='Show less'");
        expect(await (await io.flowBuilder.findElementByDataTest("marketplaceResourcesShowMore")).textContent()).toEqual('Show less');
        const dataMarketplaceResourcesAfterShowlessBtnCount = await page.locator(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES).count();
        expect(dataMarketplaceResourcesAfterShowlessBtnCount).toBeGreaterThan(dataMarketplaceResourcesCount);
    });
});