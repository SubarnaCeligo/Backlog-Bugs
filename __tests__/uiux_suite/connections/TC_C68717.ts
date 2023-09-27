import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C68717.json";

test.describe(`C68717 Verify user is able to create connection for NS JDBC connector(Basic auth) from previously created export/lookup`, () => {
  test(`C68717 Verify user is able to create connection for NS JDBC connector(Basic auth) from previously created export/lookup`, async ({
    io,
    page
  }) => {
    await io.fillFormUI(testData.flow, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("Create connection");
    await page
      .locator(selectors.basePagePO.NAME)
      .nth(1)
      .fill(testData.connection.name);
    await io.flowBuilder.fill(
      '[data-test="jdbc.host"] input',
      testData.connection.host
    );
    await io.flowBuilder.click('[data-test="jdbc.serverDataSource"]');
    await io.flowBuilder.clickByText("NetSuite.com");
    await io.flowBuilder.fill(
      '[data-test="jdbc.email"] input',
      testData.connection.email
    );
    await io.flowBuilder.fill(
      '[data-test="jdbc.password"] input',
      testData.connection.password
    );
    await io.flowBuilder.fill(
      '[data-test="jdbc.account"] input',
      testData.connection.account
    );
    await io.flowBuilder.fill(
      '[data-test="jdbc.roleId"] input',
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
    if (connectionId)
      await io.api.deleteCall(`v1/connections/${connectionId}`, {});
  });
});
