import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

const connectionName = "jdbc_connection_C104753";

test.describe(`TC_C104753 Verify "save","save and close" and "close" while creating JBDC On-Prem connection`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`TC_C104753 Verify "save","save and close" and "close" while creating JBDC On-Prem connection`, async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime()
    // navigate to my connection page
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'jdbc');
    await io.flowBuilder.fill(selectors.connectionsPagePO.APP_NAME_INPUT, 'JDBC');
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
    await io.flowBuilder.fill(selectors.connectionsPagePO.JDBC_USER_INPUT, "admin");
    await io.flowBuilder.fill(selectors.connectionsPagePO.JDBC_PASSWORD_INPUT, decrypt("bkxLNEJnR0RXWXdM"));
    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);

    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, 'Your connection is working great! Nice Job!');
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, 'Your connection is working great! Nice Job!');
    await io.connectionPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, 'Your connection is working great! Nice Job!');
  });
});