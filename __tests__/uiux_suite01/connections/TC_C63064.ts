import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C63011.json";

test.describe(`C63064 Verify in connection if user selected one api type in simple and move it to HTTP and then switch the toggle back to simple then check whether prevuiously selcted api type is persisted or not`, () => {
  test(`@Env-All @Zephyr-IO-T21825 C63064 Verify in connection if user selected one api type in simple and move it to HTTP and then switch the toggle back to simple then check whether prevuiously selcted api type is persisted or not`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "connections");
    await io.connectionPage.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Narvar"
    );
    await io.connectionPage.click(selectors.connectionsPagePO.NARVAR_CONNECTION);
    await io.connectionPage.click(
      selectors.connectionsPagePO.NARVAR_RMA_CONNECTION
    );
    await io.connectionPage.fill(selectors.basePagePO.NAME, "Narvar-RMA-Test");
    await io.connectionPage.fill(selectors.connectionsPagePO.USERNAME, "narvar");
    await io.connectionPage.fill(
      selectors.connectionsPagePO.PASSWORD,
      testData.password
    );
    await io.connectionPage.fill(
      selectors.connectionsPagePO.STORENAME,
      "celigo-test-2"
    );
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText(
      "Your connection is working great! Nice Job!",
      "Connection creation error"
    );
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH)
    await io.flowBuilder.click(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH);
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.NARVAR_RMA_CONNECTION)
    await expect(
      page
        .locator(selectors.connectionsPagePO.NARVAR_RMA_CONNECTION)
        .getByRole("radio")
    ).toBeChecked();
    await io.flowBuilder.addStep(
      "Verified previous selected api type is persisted"
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
