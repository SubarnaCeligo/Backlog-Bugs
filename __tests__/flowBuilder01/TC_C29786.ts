import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C29786_Verify a NS realtime End to END flow in firefox browser", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T6326 @Priority-P2 C29786_Verify a NS realtime End to END flow in firefox browser UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.clickByText('Listen for real-time data from source application');
        await io.flowBuilder.clickByText("Create flow step")
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.flowBuilder.clickByText('NETSUITE CONNECTION');
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C29786_Export');
        await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE);
        await io.flowBuilder.fill(`${selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE} input`, 'Account')
        await io.flowBuilder.clickByText('Account');
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
        await io.flowBuilder.click(selectors.importPagePO.FTP_IMPORT);
        await io.flowBuilder.clickByText("Transfer files into destination application");
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "FTP CONNECTION");
        await io.flowBuilder.clickByTextByIndex('FTP CONNECTION', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C29786_Import');
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.JSON);
        await io.exportsPage.fill(selectors.basePagePO.FTP_DIRECTORY_PATH, "/user")
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
         // Validating able to add realtime flows
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_ENABLE);
    });
}); 
