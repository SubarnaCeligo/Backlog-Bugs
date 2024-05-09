import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, replaceENVData } from "@celigo/aut-utilities";
import * as jsonCreds from "@testData/Connections/T27705_T27706.json";

test.describe('TC_T27696_T27705_T27706', () => {

    const createConnectionAndValidate = async ({ io, page, connectionName }) => {
        const creds = replaceENVData(jsonCreds);
        const name_input = selectors.connectionsPagePO.NAME_INPUT;
        await io.flowBuilder.waitForElementAttached(name_input);
        const nameFields = await io.homePage.getElementsLength(name_input);
        await io.homePage.fillByIndex(name_input, connectionName, nameFields - 1);
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
        const connectionDoc = await io.connections.getConnection(connectionName);
        await io.assert.expectNotToBeNull(connectionDoc, "Connection is null");
        await io.assert.expectToBeValue(connectionDoc.jdbc?.authType, 'wallet', "Connection auth type is not wallet");
    };

    test.skip('IO-T27696 Verify if able to create NSAW connection', async ({ io, page }) => {
        const connectionName = 'TC_T27705_NSAW_Connection_prod';
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.assert.verifyElementNotBeFound(selectors.connectionsPagePO.JDBC_AUTH_TYPE);

        await test.step('Creating connection', async () => createConnectionAndValidate({ io, page, connectionName }));
        await io.connections.deleteConnection(connectionName);
    });

    test.skip('IO-T27705 Verify authentication field is not shown for NSAW connector and user is able to create connection in Sandbox', async ({ io, page }) => {
        const connectionName = 'TC_T27705_NSAW_Connection_sandbox';
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.assert.verifyElementNotBeFound(selectors.connectionsPagePO.JDBC_AUTH_TYPE);

        await test.step('Creating connection', async () => createConnectionAndValidate({ io, page, connectionName }));
        const connectionDoc = await io.connections.getConnection(connectionName);
        await io.assert.expectToBeTrue(connectionDoc.sandbox, "Connection is not in sandbox.");
        await io.connections.deleteConnection(connectionName);
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    });

    test.skip('IO-T27706 Verify NSAW connection creation from exports and imports', async ({ io, page }) => {

        await test.step('Creating connection from exports', async () => {
            const connectionName = 'TC_T27706_NSAW_Connection_exp';
            await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
            await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
            await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
            await io.homePage.clickButtonAtTopOfArray(selectors.basePagePO.ADD_NEW_RESOURCE);

            await test.step('Creating connection', async () => createConnectionAndValidate({ io, page, connectionName }));
            await io.connections.deleteConnection(connectionName);
        });

        await test.step('Creating connection from imports', async () => {
            const connectionName = 'TC_T27706_NSAW_Connection_imp';
            await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
            await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
            await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
            await io.homePage.clickButtonAtTopOfArray(selectors.basePagePO.ADD_NEW_RESOURCE);

            await test.step('Creating connection', async () => createConnectionAndValidate({ io, page, connectionName }));
            await io.connections.deleteConnection(connectionName);
        });
    });
});