import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

const connectionName = "jdbc_connection_IOT2808";
const connectionNameEdited = "jdbc_connection_edited_IOT2808";


test.describe("C104757 Verify editing connection for JDBC on-Prem using MYSQL", () => {
    test.beforeEach(async ({ io }) => {
        await io.connections.deleteConnection(connectionNameEdited)
    });
    
    test("@Env-QA @Zephyr-IO-T8208 C104757 Verify editing connection for JDBC on-Prem using MYSQL and verify edit connection ", async ({
        io,
        page,
    }, testInfo) => {
        await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        await io.connections.deleteConnection(connectionNameEdited);
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
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
        await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'jdbc_connection_IOT2808');
        await page.keyboard.press("Enter");
        await io.homePage.clickByText("jdbc_connection_IOT2808");  
        await io.flowBuilder.click(selectors.basePagePO.ADD_NAME);
        await page.keyboard.type(connectionNameEdited);
        await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.connectionPage.click(selectors.basePagePO.MFA_SAVE);
    });
});
