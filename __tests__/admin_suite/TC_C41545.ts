import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41545 To verify create pull button is displayed under 'Revisions' tab for Templates(users who has Account level admin access)", () => {
  test("@Zephyr-IO-T426 @Env-All C41545 To verify create pull button is displayed under 'Revisions' tab for Templates(users who has Account level admin access)", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, "HTTP_DND");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.clickByText("Install now");
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.flowBuilder.clickByTextByIndex("Use existing connection", 0);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("HTTP ZENDESK CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByTextByIndex("Revisions", 0);
    await io.assert.verifyElementIsDisplayed(
      selectors.integrationPagePO.CREATE_PULL,
      "Element is not displayed properly"
    );
    await io.flowBuilder.clickByText("Flows");
    await io.flowBuilder.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      1
    );
    await io.flowBuilder.clickByText("Delete flow");
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
  });
});
