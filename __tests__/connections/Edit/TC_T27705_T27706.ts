import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('TC_T27705_T27706', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
      });
    test.afterEach(async ({ io }, testInfo) => {
        await io.connections.deleteConnection(testInfo.attachments?.find(({name}) => name === 'connection_name')?.body);
        await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    });
    const createConnStep = async({ io, page, connectionName}) => {
        const creds : {
            username: string,
            password: string,
            wallet_zip_location: string,
        } = {
            username: 'ADMIN',
            password: '!4I93xCKyjuD#pfH',
            wallet_zip_location: 'testData/inputData/Connections/wallet_nsaw_qa.zip'
        };

        const name_input = selectors.connectionsPagePO.NAME_INPUT;
        await io.flowBuilder.waitForElementAttached(name_input);
        const nameFields = await io.homePage.getElementsLength(name_input);
        await io.homePage.fillByIndex(name_input, connectionName, nameFields - 1);
        await io.homePage.fill('[data-test="jdbc.user"] input', creds.username);
        await io.homePage.fill(selectors.connectionsPagePO.JDBC_PASSWORD_INPUT, creds.password);
        const walletCredentials = await page.$(selectors.flowBuilderPagePO.UPLOAD_FILE);
        await walletCredentials.setInputFiles(creds.wallet_zip_location);
        await io.flowBuilder.delay(1000);
        await io.homePage.click('[data-test="jdbc.serviceName"]');
        await io.flowBuilder.delay(1000);
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.OPTIONLIST);
        await io.homePage.clickByIndex(selectors.connectionsPagePO.OPTIONLIST, 1);
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.loadingTime();
        const connectionDoc = await io.connections.getConnection(connectionName);
        expect(connectionDoc).not.toBeNull();
        expect(connectionDoc.sandbox).toEqual(true);
        expect(connectionDoc.jdbc?.authType).toEqual('wallet');
    };

    test('IO-T27705 Verify authentication field is not shown for NSAW connector and user is able to create connection in Sandbox', async({ io, page }, testInfo) => {
        const connectionName = 'TC_T27705_NSAW_Connection';
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.assert.verifyElementNotBeFound(selectors.connectionsPagePO.JDBC_AUTH_TYPE);

        //Creating Connection
        await testInfo.attach('connection_name', { body: connectionName});
        await test.step('Creating connection', async() => createConnStep({ io, page, connectionName }));
    });

    test('IO-T27706 Verify NSAW connection creation from exports', async({ io, page }, testInfo) => {
        const connectionName = 'TC_T27706_NSAW_Connection_01';
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.homePage.clickButtonAtTopOfArray(selectors.basePagePO.ADD_NEW_RESOURCE);

        //Creating Connection
        await testInfo.attach('connection_name', { body: connectionName});
        await test.step('Creating connection', async() => createConnStep({ io, page, connectionName }));
    });


    test('IO-T27706 Verify NSAW connection creation from imports', async({ io, page }, testInfo) => {
        const connectionName = 'TC_T27706_NSAW_Connection_02';
        await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.homePage.clickButtonAtTopOfArray(selectors.basePagePO.ADD_NEW_RESOURCE);

        //Creating Connection
        await testInfo.attach('connection_name', { body: connectionName});
        await test.step('Creating connection', async() => createConnStep({ io, page, connectionName }));
    });
});