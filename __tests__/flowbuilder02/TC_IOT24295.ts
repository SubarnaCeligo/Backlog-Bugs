import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT4295 Test to Verify the ""How would you like to use the existing flow step?"" field is not displaying if we select a flow step from Marketplace flow steps`, () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Epic-IO-56742 @Priority-P2 @Zephyr-IO-T24295 @Env-All", async ({ io, page }) => {
        await io.homePage.loadingTime();
        await io.homePage.clickByText("Create");
        await io.homePage.click(selectors.homePagePO.CREATEFLOW);
        await io.flowBuilder.clickAddSource();
        await io.flowBuilder.waitForElementAttached("text='Marketplace flow steps'");
        await io.assert.verifyElementIsDisplayed("text='Marketplace flow steps'", 'Marketplace flow steps header is not present before application selection');
        expect(await page.getByText('What would you like to do?')).not.toBeVisible();
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP);
        expect(await page.getByText('What would you like to do?')).toBeVisible();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.MARKETPLACE_RESOURCES);
        const nextBtn = page.locator(selectors.basePagePO.SAVE);
        await expect(nextBtn).toHaveAttribute('disabled');
        (await io.homePage.findElementByDataTest("marketplaceResources")).click();
        const nextBtnAfterSave = page.locator(selectors.basePagePO.SAVE);
        await expect(nextBtnAfterSave).not.toHaveAttribute('disabled');
        (await io.homePage.findElementByDataTest("save")).click();
        await io.flowBuilder.waitForElementAttached("text='Create export'");
        expect(await page
            .locator(selectors.exportsPagePO.HTTP_RELATIVE_URI)
            .evaluate((el: HTMLInputElement) => el.value)).not.toEqual('');
        await io.homePage.fill(selectors.exportsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
        await io.flowBuilder.clickByText('HTTP ZENDESK CONNECTION');
        const exisitingFlowStep = await page.locator("text='How would you like to use the existing flow step?'")
        expect(exisitingFlowStep).not.toBeVisible();

    });
});