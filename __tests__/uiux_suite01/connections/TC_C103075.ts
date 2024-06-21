import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C103075 Verify the advance section in simple view", () => {
  //Skipped this test case as we don;t have creds for the connection and the tracker is : https://celigo.atlassian.net/browse/IOAUT-15782
  test.skip("@Zephyr-IO-T24475 C103075 Verify the advance section in simple view", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.loadingTime()
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "Personio"
    );
    await io.flowBuilder.clickByText("Personio");
    await io.flowBuilder.click(selectors.connectionsPagePO.IMPORT_RECORDS);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.loadingTime()
    await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN,"Personio");
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.clickByText("Advanced");
    await io.assert.verifyElementContainsText(
      selectors.importPagePO.ADVANCED + " ~ div",
      "Blob key pathPurge blob data immediately?"
    );

    await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.flowBuilder.clickByText("Advanced");
    await io.assert.verifyElementContainsText(
      selectors.importPagePO.ADVANCED + " ~ div",
      "Blob key pathPurge blob data immediately?"
    );
  });
});
