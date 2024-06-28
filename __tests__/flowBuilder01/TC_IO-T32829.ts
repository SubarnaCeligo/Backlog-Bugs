import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author_MaheshNivruttiSutar Verify After selecting connection File filtering conditions should not clear for FTP export.", () => {
    test.describe.configure({ retries: 2 })
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.flowBuilder.loadingTime();
    });
    test("@Epic-IO-82072 @Priority-P2 @Env-All @Zephyr-IO-T32829", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.homePage.loadingTime();
        await io.flowBuilder.clickByText('Create flow step');
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP EXPORT');
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText('JSON');
        await io.flowBuilder.fill(selectors.exportsPagePO.FTP_DIRECTORY_PATH, 'test');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RULE_VALUE, 'CreateUser.json', 0);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.flowBuilder.clickByText('FTP CONNECTION');
        await io.flowBuilder.loadingTime();
        const fileFilter = await page.$(selectors.flowBuilderPagePO.FILTER_CONTENT);
        expect(await fileFilter.screenshot()).toMatchSnapshot("IO-T32829.png",{maxDiffPixelRatio: 0.2});
    });
});