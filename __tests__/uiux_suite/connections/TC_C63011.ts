import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63011 Verify User is able create connection while cloning integration.`, () => {
  test(`C63011 Verify User is able create connection while cloning integration.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/Connections/C63011.zip");
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
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.NARVAR_CONNECTION,
      "API type 'Narvar' not visible"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.connectionsPagePO.NARVAR_RMA_CONNECTION,
      "API type 'Narvar' not visible"
    );
  });
});
