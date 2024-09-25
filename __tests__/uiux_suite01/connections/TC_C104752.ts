import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

const connectionName = "jdbc_connection_C104752";

test.describe("C104752 Verify test connection for JDBC On-Prem cnnector", () => {
    test.beforeEach(async ({ io }) => {
        await io.connections.deleteConnection(connectionName)
    });
    
    test("@Env-All @Zephyr-IO-T8204 C104752 Verify test connection for JDBC On-Prem cnnector", async ({
        io,
        page,
    }, testInfo) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connections.deleteConnection(connectionName);
        await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
        await page.keyboard.type("JDBC");
        await io.flowBuilder.click(selectors.connectionsPagePO.JDBC_CONNECTOR);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.type(connectionName);
        await io.flowBuilder.click(selectors.connectionsPagePO.AGENT_FIELD);
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await io.flowBuilder.fill(selectors.connectionsPagePO.JDBC_HOST_INPUT, "jdbc:sqlserver://ms-sql-sql-server-2017.cu9ep4kmgkck.us-east-1.rds.amazonaws.com;encrypt=false;databaseName=componentTestsDB");
        await page.keyboard.press("Tab");
        await page.keyboard.press("Tab");
        await page.keyboard.type("C:\\Jars");
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click('.MuiDialogActions-root .MuiButtonBase-root');
        await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, 'This connection is currently offline. Re-enter your credentials to bring it back online.');
    });
});
