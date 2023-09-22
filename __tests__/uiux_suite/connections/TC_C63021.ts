import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63021 Verify User is able create connection while installing integration.`, () => {
  test(`C63021 Verify User is able create connection while installing integration.`, async ({
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
    // TODO replace: selectors.connectionsPagePO.NARVAR_RMA_CONNECTION
    await io.homePage.click('[data-test="Narvar RMA"]');
    await io.homePage.fill(selectors.basePagePO.NAME, "Narvar-RMA-Test");
    await io.homePage.fill(
      // TODO replace: selectors.connectionsPagePO.USERNAME
      '[data-test="http.auth.basic.username"] input',
      "narvar"
    );
    await io.homePage.fill(
      // TODO replace: selectors.connectionsPagePO.PASSWORD
      '[data-test="http.auth.basic.password"] input',
      "E59E404A332C1692B4CB1D63103E5520"
    );
    await io.homePage.fill(
      // TODO replace: selectors.connectionsPagePO.STORENAME
      '[data-test="http.unencrypted.storename"] input',
      "celigo-test-2"
    );
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText(
      "Configured",
      "Connection creation error"
    );
  });
});
