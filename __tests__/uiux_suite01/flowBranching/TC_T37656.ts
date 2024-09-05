import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`T37656 Updated API Endpoint Verify above cases while cloning and installing the zip file`, () => {
  test(`@Zephyr-IO-T37656 @Env-All @Priority-P2 T37656 Updated API Endpoint Verify above cases while cloning and installing the zip file`, async ({
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
    await fileChooser.setFiles("testData/inputData/FlowBuilder/T37653.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.homePage.clickByTextByIndex("108197_connection", 0);
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);

    await io.homePage.loadingTime();

    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "test-flow"
    );

    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(
      selectors.flowBuilderPagePO.ACTIONS_SELECTOR
    );

    //Open the flow
    await io.flowBuilder.clickByText("test-flow");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);

    await io.homePage.loadingTime();

    await io.assert.verifyElementDisplayedByText(
      "POST_FLAT_FILE_BOOKLOADER_DATA (soon to be deprecated)",
      "Feed type is not displayed"
    );
  });
});
