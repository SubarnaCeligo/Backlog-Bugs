import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C68717.json";

test.describe(`C68717 Verify user is able to create connection for NS JDBC connector(Basic auth) from previously created export/lookup`, () => {
  test(`@Env-All @Zephyr-IO-T8440 C68717 Verify user is able to create connection for NS JDBC connector(Basic auth) from previously created export/lookup`, async ({
    io,
    page
  }) => {
    await io.createResourceFromAPI(testData.flow, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("Create connection");
    await page
      .locator(selectors.basePagePO.NAME)
      .nth(1)
      .fill(testData.connection.name);
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.JDBC_HOST_INPUT,
      testData.connection.host
    );
    await io.flowBuilder.click(
      selectors.connectionsPagePO.JDBC_SERVER_DATA_SOURCE
    );
    await io.flowBuilder.clickByText("NetSuite.com");
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.JDBC_EMAIL_INPUT,
      testData.connection.email
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.JDBC_PASSWORD_INPUT,
      testData.connection.password
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.JDBC_ACCOUNT_INPUT,
      testData.connection.account
    );
    await io.flowBuilder.fill(
      selectors.connectionsPagePO.JDBC_ROLE_ID_INPUT,
      testData.connection.roleId
    );
    await io.flowBuilder.clickByIndex(selectors.basePagePO.SAVE, 1);
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
  });
  test.afterEach(async ({ io }) => {
    const connections = await io.api.getCall("v1/connections");
    const connectionId = connections.find(
      (connection: any) => connection.name === testData.connection.name
    )?._id;
    if (connectionId) await io.api.deleteCall(`v1/connections/${connectionId}`);
  });
});
