import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, replaceENVData } from "@celigo/aut-utilities";
import * as jsonCreds from "@testData/Connections/T27705_T27706.json";

test.describe('TC_T27704', () => {
    let connectionDoc;
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("TC_T27704_NSAW_Connection", connectionDoc._id);

    });
    test.skip('TC_T27704 Creating NSAW connection while cloning from existing integration', async ({ io, page }) => {
        await test.step("*** Searching source integration and navigating to clone integration ***", async () => {
            await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
            await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'NSAW-Oracle ADW integration_DND');
            await io.homePage.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
            await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
            await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
        });


        await test.step("**** Creating connection ****", async () => {
            await io.flowBuilder.clickByText("Configure");
            const creds = replaceENVData(jsonCreds);
            await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_T27704_NSAW_Connection");
            await io.homePage.fill(selectors.connectionsPagePO.JDBC_USER_INPUT, creds.username);
            await io.homePage.fill(selectors.connectionsPagePO.JDBC_PASSWORD_INPUT, decrypt(creds.password));
            const walletCredentials = await page.$(selectors.flowBuilderPagePO.UPLOAD_FILE);
            await walletCredentials.setInputFiles(creds.wallet_zip_location);
            await io.flowBuilder.delay(1000);
            await io.homePage.click(selectors.connectionsPagePO.JDBC_SERVICE_NAME);
            await io.flowBuilder.delay(1000);
            await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.OPTIONLIST);
            await io.homePage.clickByIndex(selectors.connectionsPagePO.OPTIONLIST, 1);
            await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
            await io.homePage.loadingTime();
            connectionDoc = await io.connections.getConnection("TC_T27704_NSAW_Connection");
            await io.assert.expectNotToBeNull(connectionDoc, "Connection is null");
            await io.assert.expectToBeValue(connectionDoc.jdbc?.authType, 'wallet', "Connection auth type is not wallet");
        });

        await test.step('*** Uninstalling Integration ***', async () => {
            await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL);
            await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL_CONFIRM);
        });
    });
});