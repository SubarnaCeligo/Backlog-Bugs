import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { Flow, Oracle_Connection, NSAW_Connection } from "@testData/Connections/T27708_T27709.json";

test.describe('TC_T27708_T27709_T27695', () => {
    test('TC_T27708_T27709_T27695', async ({ io, page }) => {
        let flowId;
        let oracleConnection;
        let nsawConnection;

        await test.step("*** Creating Flow and Connections ***", async () => {
            flowId = await io.createResourceFromAPI(Flow, "FLOWS");
            oracleConnection = await io.connections.createConnectionViaAPI(Oracle_Connection);
            nsawConnection = await io.connections.createConnectionViaAPI(NSAW_Connection);
        });

        await test.step('IO-T27708 Verify Replace connection from exports & imports form', async () => {
            await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
            await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
            let connections = await page
                .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`).filter({ hasText: 'oracle' }).count();
            await io.assert.expectToBeFalse(connections > 0, "Oracle connections are also shown in connection dropdown");
            await io.flowBuilder.clickByText(NSAW_Connection.name);
            await io.flowBuilder.click(selectors.basePagePO.CLOSE);
            await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);

            await io.flowBuilder.click(selectors.flowBuilderPagePO.LOOKUP);
            await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
            connections = await page
                .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`).filter({ hasText: 'oracle' }).count();
            await io.assert.expectToBeTrue(connections >= 1, "Oracle connections aren't only shown in connection dropdown");
            await io.flowBuilder.click(selectors.basePagePO.CLOSE);

            await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
            await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
            connections = await page
                .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`).filter({ hasText: 'nsaw' }).count();
            await io.assert.expectToBeTrue(connections >= 1, "NSAW connections aren't only shown in connection dropdown");
            await io.flowBuilder.click(selectors.basePagePO.CLOSE);
        });


        await test.step('IO-T27709 Verify Replace connection from flowbuilder replace connection form', async () => {
            await io.homePage.click(selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS);
            await io.homePage.clickButtonAtTopOfArray(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
            await io.homePage.click(selectors.flowBuilderPagePO.REPLACE_CONNECTION);
            await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
            const connections = await page
                .locator(`${selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST} li`).count();
            await io.assert.expectToBeTrue(connections === 1, "NSAW connections aren't only shown in connection dropdown");
            await io.flowBuilder.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
        });

        await test.step('IO-T27695 Verify able to create Oracle connection with customjdbc auth type', async () => {
            await io.assert.expectToBeValue(oracleConnection.jdbc?.authType, 'customjdbc', "Connection auth type is not customjdbc");
        });


        await test.step('*** Deleting Flow and Connections ***', async () => {
            await io.api.deleteFlowViaAPI(flowId);
            await io.connections.deleteConnection('Oracle_Connection', oracleConnection);
            await io.connections.deleteConnection('NSAW_Connection', nsawConnection);
        });
    });
});