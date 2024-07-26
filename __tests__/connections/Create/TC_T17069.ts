import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import connection from "@testData/Connections/Create/T17069.json";

test.describe("Verify saving the connection by giving the invalid refresh token the connection should not go to offline", () => {
  let connectionId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteCall(`v1/connections/${connectionId}`);
  });

  test("@Zephyr-IO-T17069 @Env-All @Epic-IO-86262 @Priority-P2 - Verify saving the connection by giving the invalid refresh token the connection should not go to offline", async ({
    io,
    page
  }) => {
    let connID1 = await io.api.postCall("v1/connections", connection);
    connectionId = connID1._id

    await io.flowBuilder.loadingTime();
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] + `connections/edit/connections/${connectionId}`
    );

    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.NAME_INPUT);
    
    await io.flowBuilder.fill(selectors.connectionsPagePO.QUICKBASE_TOKEN, "testToken");
    await io.flowBuilder.fill(`${selectors.connectionsPagePO.REFRESH_TOKEN} input`, "testToken");
    
    await io.flowBuilder.click(selectors.basePagePO.TEST_CONNECTION);
    await io.flowBuilder.loadingTime();
    
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR);
    await io.assert.verifyElementContainsText(selectors.basePagePO.NOTIFICTION_BAR, 'Your connection is working great! Nice Job!');

  });
});
