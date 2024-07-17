import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C112086 Verify the JWT bearer connection while cloning `, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
  test(`@Env-QA @Zephyr-IO-T14668 C112086 Verify the JWT bearer connection while cloning`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Automation Flows")
    await io.homePage.clickByText("Automation Flows")
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "Github_DND")
    await io.homePage.waitForElementAttached("text='Github_DND'")
    await io.homePage.clickByText("Github_DND")
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      0
    );
    await io.flowBuilder.clickByText("Clone flow");
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
    await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT,'Clone_Github');
    await io.flowBuilder.click(selectors.integrationPagePO.SELECT_DESTINATION_INTEGRATION);
    await io.flowBuilder.selectTextfromDropDown(page, "none");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("FTP CONNECTION");
    await io.homePage.selectTextfromDropDown(page, connId)
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.click(selectors.templatePagePO.CONFIGURE);
    await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    await io.connectionPage.clickByTextByIndex("GITHUB JWT CONNECTION", 1);
  });
});