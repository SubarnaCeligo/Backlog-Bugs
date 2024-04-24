import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C63011.json";

test.describe(`C63011 Verify User is able create connection while cloning integration.`, () => {
  test(`@Env-All @Zephyr-IO-T21802 C63011 Verify User is able create connection while cloning integration.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/Connections/C63011.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await page
      .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
      .getByText("Narvar")
      .first()
      .click();
    await io.homePage.addStep("Selected 'Narvar' from dropdown");
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_INSTALL_BUTTON
    );
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
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
      "Configured",
      "Connection creation error"
    );
  });
  test.afterEach(async ({ io }) => {
    const connections = await io.api.getCall("v1/connections");
    const connectionId = connections.find(
      (connection: any) => connection.name === "Narvar-RMA-Test"
    )._id;
    await io.api.deleteCall(`v1/connections/${connectionId}`);
  });
});
