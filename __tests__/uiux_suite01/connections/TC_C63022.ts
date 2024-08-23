import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C63022 Verify User is able use existing connection with different API Type while installing integration.`, () => {
  test(`@Env-All @Zephyr-IO-T21813 C63022 Verify User is able use existing connection with different API Type while installing integration.`, async ({
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
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("Narvar RMA");
    await io.connectionPage.selectTextfromDropDown(page, connId)
    await io.connectionPage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.connectionPage.loadingTime();
    await io.assert.verifyElementDisplayedByText(
      "Configured",
      "Connection configuration error"
    );
  });
});
