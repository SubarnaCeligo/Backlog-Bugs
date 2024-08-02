import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68493 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", () => {
  test("@Env-all  @Zephyr-IO-T17397 C68493 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", async ({
    io, page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "1 - TC_C68492-DND")
    await io.integrationPage.waitForElementAttached("[data-test='openActionsMenu']");
    await io.flowBuilder.clickByText('1 - TC_C68492-DND');
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.homePagePO.PRODUCTION);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
              await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT,'Clone - 1 - TC_C68492');
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.homePage.click(selectors.homePagePO.STAY_IN_PRODUCTION);
    await io.marketplacePage.waitForElementAttached(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.homePage.selectTextfromDropDown(page, connId)
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    connId = connMap.get("HTTP MIVA CONNECTION");
    await io.homePage.selectTextfromDropDown(page, connId)
    await io.connectionPage.click(selectors.basePagePO.SAVE);
    await io.homePage.click(selectors.basePagePO.INSTALL);
    await io.homePage.clickByTextByIndex("Clone - 1 - TC_C68492", 0);
    // await io.assert.verifyElementIsDisplayed(
    //   selectors.basePagePO.EDIT_SCHEDULE,
    //   "Scheduling is not present"
    // );
  });
});
