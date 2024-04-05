import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C98851 Verify user is able create a connection from export,import and lookup", () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
         await io.homePage.loadingTime()
    });
    test("@Env-All C98851 Verify user is able create a connection from export UI_Backlog", async ({ io, page }) => {
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ware2go');
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_CONNECTION);
        await io.flowBuilder.clickByText("Create from scratch");
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_ACCOUNTTYPE);
        await io.connectionPage.selectTextfromDropDown(page, "Production");
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_PLATFORMVERSION);
        await io.connectionPage.selectTextfromDropDown(page, "Platform 1");
        await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "Test");
        await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, "Test@123");
        await io.homePage.fill(selectors.connectionsPagePO.WARE2GO_MERCHANT_ID, "Test123");
        await io.flowBuilder.fill("input[placeholder='Ware2Go connection']", 'TC_C98851_Connection');
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE)
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.connectionPage.waitForElementAttached(selectors.basePagePO.MFA_SAVE);
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        const validationText = (await io.flowBuilder.getText(selectors.basePagePO.NOTIFICATION_ID)) as string;
        // Validating able to create connection in export
        await io.assert.expectToContainValue("Your test was not successful. Check your information and try again", validationText, "error");
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ware2go');
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_CONNECTION);
        await io.myAccountPage.clickByText("Import records into destination application");
        await io.flowBuilder.clickByText("Create from scratch");
        await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.ADDNEWRESOURCE)
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_ACCOUNTTYPE);
        await io.connectionPage.selectTextfromDropDown(page, "Production");
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_PLATFORMVERSION);
        await io.connectionPage.selectTextfromDropDown(page, "Platform 1");
        await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "Test");
        await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, "Test@123");
        await io.homePage.fill(selectors.connectionsPagePO.WARE2GO_MERCHANT_ID, "Test123");
        await io.flowBuilder.fill("input[placeholder='Ware2Go connection']", 'TC_C98851_Connection');
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.waitForElementAttached(selectors.basePagePO.MFA_SAVE);
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        // Validating able to create connection in import
        await io.assert.expectToContainValue("Your test was not successful. Check your information and try again", validationText, "error");
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ware2go');
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_CONNECTION);
        await io.myAccountPage.clickByText("Look up additional records (per record)");
        await io.flowBuilder.clickByText("Create from scratch");
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_ACCOUNTTYPE);
        await io.connectionPage.selectTextfromDropDown(page, "Production");
        await io.flowBuilder.click(selectors.connectionsPagePO.WARE2GO_PLATFORMVERSION);
        await io.connectionPage.selectTextfromDropDown(page, "Platform 1");
        await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "Test");
        await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, "Test@123");
        await io.homePage.fill(selectors.connectionsPagePO.WARE2GO_MERCHANT_ID, "Test123");
         await io.flowBuilder.fill("input[placeholder='Ware2Go connection']", 'TC_C98851_Connection');
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.waitForElementAttached(selectors.basePagePO.MFA_SAVE);
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        // Validating able to create connection in lookup
        await io.assert.expectToContainValue("Your test was not successful. Check your information and try again", validationText, "error");
    });
}); 
