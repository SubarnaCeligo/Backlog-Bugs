import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/Connections/Narvar.json";
import testData from "@testData/Connections/C63011.json";

test.describe(`C63024 Verify user is able to create connection from already created export/lookup and import`, () => {
  test(`@Zephyr-IO-T21815 C63024 Verify user is able to create connection from already created export/lookup and import`, async ({
    page,
    io
  }) => {
    await io.createResourceFromAPI(flow, "FLOWS");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.flowBuilder.click(
      `td ${selectors.connectionsPagePO.ACTIONS_MENU_BUTTON}`
    );
    await io.flowBuilder.clickByText("Replace connection");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("Create connection");
    await io.homePage.click(selectors.connectionsPagePO.NARVAR_RMA_CONNECTION);
    await io.homePage.fill(selectors.basePagePO.NAME, "Narvar-RMA-Test");
    await io.homePage.fill(selectors.connectionsPagePO.USERNAME, "narvar");
    await io.homePage.fill(
      selectors.connectionsPagePO.PASSWORD,
      testData.password
    );
    await io.homePage.fill(
      selectors.connectionsPagePO.STORENAME,
      "celigo-test-2"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
  });
  test.afterEach(async ({ io }) => {
    const connections = await io.api.getCall("v1/connections");
    const connectionId = connections.find(
      (connection: any) => connection.name === "Narvar-RMA-Test"
    )?._id;
    await io.api.deleteCall(`v1/connections/${connectionId}`);
  });
});
