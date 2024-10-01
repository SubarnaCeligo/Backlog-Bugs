import { test, expect } from "@celigo/ui-core-automation";
import allure from "allure-playwright";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C30441_For an export or import with its connection offline, Verified that ,upon opening the export or import,Connection is offline message is displayed", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test("@Env-All @Zephyr-IO-T2210 TC_C30441_For an export or import with its connection offline, Verified that ,upon opening the export or import,Connection is offline message is displayed UI_Backlog", async ({ io, page }, testInfo) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
        await io.flowBuilder.loadingTime();
        await io.homePage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.homePage.clickByText("FTP");
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);
        await io.homePage.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
        await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.homePage.loadingTime();
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP OFFLINE');
        await io.flowBuilder.clickByText('FTP OFFLINE - Offline');
        // Validating connection offline error message
        await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICATION_ID, "The connection associated with this resource is currently offline and configuration is limited.")
    });
});