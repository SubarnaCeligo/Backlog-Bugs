import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('TC_T27692_T27693_T27694', () => {
    const oracleConnction = 'ORACLE ADW CONNECTION';
    const nsawConnection = 'NSAW CONNECTION';

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      });

    test('IO-T27692 Verify authentication field is not shown for NSAW connector while creating connection', async({ io }) => {
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.click(selectors.connectionsPagePO.NSAW_CONNECTION);
        await io.assert.verifyElementNotBeFound(selectors.connectionsPagePO.JDBC_AUTH_TYPE);

    });

    test('IO-T27693 Verify authentication field is not shown while editing Oracle Autonomous Database connection', async({ io }) => {
        const connectionDoc = await io.connections.getConnection(oracleConnction);
        expect(connectionDoc).not.toBeNull();
        expect(connectionDoc.jdbc?.authType).toEqual('customjdbc');
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, oracleConnction);
        await io.homePage.clickByText(oracleConnction);
        await io.assert.verifyElementNotBeFound(selectors.connectionsPagePO.JDBC_AUTH_TYPE);
    });

    test('IO-T27694 Verify authentication field is not shown while editing NetSuite Analytics Warehouse (NSAW) connection', async({ io }) => {
        const connectionDoc = await io.connections.getConnection(nsawConnection);
        expect(connectionDoc).not.toBeNull();
        expect(connectionDoc.jdbc?.authType).toEqual('wallet');
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, nsawConnection);
        await io.homePage.clickByText(nsawConnection);
        await io.assert.verifyElementNotBeFound(selectors.connectionsPagePO.JDBC_AUTH_TYPE);
    });
});