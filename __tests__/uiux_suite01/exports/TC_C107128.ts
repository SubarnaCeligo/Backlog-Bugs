import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C107128  Verify the the file filter for add condition group for S3", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
    });

    test("@Zephyr-T23802 @Env-All @Priority-P2 TC_C107128 Verify the the file filter for add condition group for S3. UI_Backlog", async ({ io, page }) => {
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'S3');
        await io.flowBuilder.click(selectors.connectionsPagePO.S3_CONNECTION);

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'S3 CONNECTION');
        await io.flowBuilder.clickByText('S3 CONNECTION');
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'S3_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);

        const element = page.locator(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
        await element.scrollIntoViewIfNeeded();
        await io.flowBuilder.clickByTextByIndex('Add condition', 0);
        await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test', 0);

        await io.flowBuilder.clickByTextByIndex('Add conditions group', 0);
        await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test', 1);

        await io.flowBuilder.clickByTextByIndex('Add conditions group', 1);
        await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test', 2);

        await io.flowBuilder.clickByTextByIndex('Add conditions group', 2);
        await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test', 3);

        await io.flowBuilder.clickByTextByIndex('Add condition', 0);
        await io.flowBuilder.fillByIndex(selectors.exportsPagePO.FILE_FILTER_CONDITIONS_FILE_NAME_INPUT, 'test', 4);
        await page.keyboard.press('Enter');

        const fileFilterConditions = await page.$(selectors.exportsPagePO.FILE_FILTER_CONDITIONS);
        expect(await fileFilterConditions.screenshot()).toMatchSnapshot("C107128.png", {maxDiffPixelRatio: 0.2});
    });
});