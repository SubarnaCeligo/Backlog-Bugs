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
    await io.assert.verifyElementIsDisplayed(
      '[data-test="Narvar"]',
      "API type 'Narvar' not visible"
    );
    await io.assert.verifyElementIsDisplayed(
      '[data-test="Narvar RMA"]',
      "API type 'Narvar' not visible"
    );
  });
});
