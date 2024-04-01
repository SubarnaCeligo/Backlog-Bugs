import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT4293 Test to Verify Next button is disabled if we don't have selected a flow step from 'Marketplace flow steps' Or Selected a tile from Your existing flow steps`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Epic-IO-56742 @Priority-P2 @Zephyr-IO-T4293", async ({ io, page }) => {
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
         const nextBtn= page.locator(selectors.basePagePO.SAVE); 
         await expect(nextBtn).toHaveAttribute('disabled');
    });
});