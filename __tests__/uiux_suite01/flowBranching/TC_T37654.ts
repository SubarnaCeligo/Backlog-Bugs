import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Zephyr-IO-T37654 Updated API Endpoint Verify above cases while cloning and installing the zip file", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Priority-P2 @Zephyr-IO-T37654 Updated API Endpoint Verify above cases while cloning and installing the zip file", async ({
    io,
    page
  }) => {
    //Go to Home Page
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.homePage.addStep(
      "@Zephyr-IO-T37654 - Updated API Endpoint Verify above cases while cloning and installing the zip file"
    );
    //search for the integration
    await io.homePage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "New_flow"
    );
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      0
    );

    //Clone the integration
    await io.homePage.waitForElementAttached(
      selectors.integrationPagePO.CLONE_INTEGRATION
    );
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.loadingTime();

    //Input name
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(
      selectors.connectionsPagePO.NAME_INPUT,
      "CloneTest_ToBeDeleted"
    );

    //Clone
    await io.homePage.waitForElementAttached(
      selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON
    );
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);

    //Configure connection
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.CONFIGURE);
    await io.homePage.click(selectors.templatePagePO.CONFIGURE);
    await io.homePage.waitForElementAttached(
      selectors.connectionsPagePO.EXISTING
    );
    await io.homePage.click(selectors.connectionsPagePO.EXISTING);
    await io.homePage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.homePage.loadingTime();
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("108197_connection");
    await io.connectionPage.selectTextfromDropDown(page, connId);

    //Save
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.INSTALL);
    await io.homePage.click(selectors.basePagePO.INSTALL);

    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.templatePagePO.FLOWS);

    //Open cloned flow
    await io.flowBuilder.clickByText("test-flow");

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);

    await io.homePage.loadingTime();

    await io.assert.verifyElementDisplayedByText(
      "POST_FLAT_FILE_BOOKLOADER_DATA (soon to be deprecated)",
      "Feed type is not displayed"
    );
  });
});
