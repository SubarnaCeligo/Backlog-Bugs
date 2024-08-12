import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C56630 Verify cloning and install a flow zip with oauth 1.0 connection.`, () => {
  test(`@Zephyr-IO-T15583 @Env-All @Priority-P2 C56630 Verify cloning and install a flow zip with oauth 1.0 connection.`, async ({
    io,
    page
  }) => {
    await io.homePage.addStep("Creating the integration");
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/FlowBuilder/T15583.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );

    await io.connectionPage.click(selectors.connectionsPagePO.AUTH_TYPE);
    await io.connectionPage.clickByText("OAuth 1.0");

    let text = (
        await io.homePage.getText(selectors.connectionsPagePO.AUTH_TYPE)
      ).toString();
    
    let result = false;
    if (
      text.includes(
        `OAuth 1.0`
      )
    ) {
      result = true;
    }

    await expect(result).toBeTruthy();
  });
});
