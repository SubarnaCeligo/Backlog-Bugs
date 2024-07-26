import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C107148  Check the UI alignment for file filter is matching with Figma or not", () => {
    test.describe.configure({ retries: 1 })
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
    });

    test("@Zephyr-T29268 @Env-All @Priority-P2 TC_C107148 Check the UI alignment for file filter is matching with Figma or not.", async ({ io, page }) => {
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'S3');
        await io.flowBuilder.click(selectors.connectionsPagePO.S3_CONNECTION);

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'S3 CONNECTION');
        await io.exportsPage.clickByTextByIndex('S3 CONNECTION', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'S3_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);

        const element = page.locator(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
        await element.scrollIntoViewIfNeeded();
        await io.flowBuilder.clickByTextByIndex('Add condition', 0);
        await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test@1234%$', 0);

        await page.keyboard.press('Enter');

        const fileFilterConditions = await page.$(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
        expect(await fileFilterConditions.screenshot()).toMatchSnapshot("C107148.png", {maxDiffPixelRatio: 0.2});
    });
});