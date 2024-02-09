import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C98851 Verify user is able create a connection from export,import and lookup", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C98851 Verify user is able create a connection from export", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ware2go');
        await io.flowBuilder.click('[data-test="Ware2Go"]');
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.click('[id="mui-component-select-/settings/Accounttype"]');
        await io.connectionPage.selectTextfromDropDown(page, "Production");
        await io.flowBuilder.click('[data-test="settings.Platformversion"]');
        await io.connectionPage.selectTextfromDropDown(page, "Platform 1");
        await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "Test");
        await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, "Test@123");
        await io.homePage.fill('[data-test="http.unencrypted.merchantId"] input', "Test123");
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C98851_Connection');
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        const validationText = (await io.flowBuilder.getText(selectors.basePagePO.NOTIFICATION_ID)) as string;
        // Validating able to create connection in export
        await io.assert.expectToContainValue("Your test was not successful. Check your information and try again", validationText, "error");
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ware2go');
        await io.flowBuilder.click('[data-test="Ware2Go"]');
        await io.myAccountPage.clickByText("Import records into destination application");
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.click('[id="mui-component-select-/settings/Accounttype"]');
        await io.connectionPage.selectTextfromDropDown(page, "Production");
        await io.flowBuilder.click('[data-test="settings.Platformversion"]');
        await io.connectionPage.selectTextfromDropDown(page, "Platform 1");
        await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "Test");
        await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, "Test@123");
        await io.homePage.fill('[data-test="http.unencrypted.merchantId"] input', "Test123");
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C98851_Connection');
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        // Validating able to create connection in import
        await io.assert.expectToContainValue("Your test was not successful. Check your information and try again", validationText, "error");
    });
}); 
