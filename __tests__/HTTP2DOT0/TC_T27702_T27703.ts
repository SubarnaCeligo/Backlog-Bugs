import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { Flow } from "@testData/Connections/T27708_T27709.json";
import { decrypt, replaceENVData } from "@celigo/aut-utilities";
import * as jsonCreds from "@testData/Connections/T27705_T27706.json";

test.describe('TC_T27702_T27703', () => {
    let connId1, connId2;

    test.afterEach(async ({ io }) => {
        await io.connections.deleteConnection("TC_T27702_oracle_Connection", connId1);
        await io.connections.deleteConnection("TC_T27702_NSAW_Connection", connId2);
    });

    test.skip('TC_T27702_T27703 Creating NSAW and Oracle ADW connections while cloning a flow', async ({ io, page }) => {
        let flowId;

        await test.step("*** Creating Flow and opening clone page ***", async () => {
            flowId = await io.createResourceFromAPI(Flow, "FLOWS");
            await io.flowBuilder.click(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONEFLOW);
            await io.flowBuilder.clickByText("Please select");
            await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
            await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
        });


        await test.step("**** Creating connection two ****", async () => {
            await io.flowBuilder.clickByTextByIndex("Configure", 0);
            const creds = replaceENVData(jsonCreds);
            await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_T27702_NSAW_Connection");
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
            const connectionDoc = await io.connections.getConnection("TC_T27702_NSAW_Connection");
            connId1 = connectionDoc._id;
            await io.assert.expectNotToBeNull(connectionDoc, "Connection is null");
            await io.assert.expectToBeValue(connectionDoc.jdbc?.authType, 'wallet', "Connection auth type is not wallet");
        });
        await test.step("**** Creating connection one ****", async () => {
            await io.flowBuilder.clickByTextByIndex("Configure", 0);
            await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "TC_T27702_oracle_Connection");
            await io.connectionPage.fill(selectors.connectionsPagePO.JDBC_PASSWORD_INPUT, 'test');
            await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
            await io.connectionPage.click(selectors.connectionsPagePO.CANCEL_TEST_CALL);
            await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
            await io.homePage.loadingTime();
            const connectionDoc = await io.connections.getConnection("TC_T27702_oracle_Connection");
            connId2 = connectionDoc._id;
            await io.assert.expectNotToBeNull(connectionDoc, "Connection is null");
            await io.assert.expectToBeValue(connectionDoc.jdbc?.authType, 'customjdbc', "Connection auth type is not customjdbc");
        });

        await test.step('*** Deleting Flow ***', async () => {
            await io.api.deleteFlowViaAPI(flowId);
        });
    });
});