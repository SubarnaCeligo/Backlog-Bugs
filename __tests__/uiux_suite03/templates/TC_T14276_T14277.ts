import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify import and lookup of ChannelApe assistant", () => {
  test("@Zephyr-IO-T14276 @Zephyr-IO-T14277 @Env-All @Epic-IO-86262 @Priority-P2 - Verify import and lookup of ChannelApe assistant", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.goToMenu("Marketplace");
    await io.flowBuilder.loadingTime();

    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, "T14276 and T14277");
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.clickByText("Install now");
  
    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.flowBuilder.clickByTextByIndex("Use existing connection", 0);
    await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
    let connMap = await io.api.loadConnections();
    let connId = connMap.get("CHANNELAPE CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
  
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.INSTALL);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();

    await io.flowBuilder.clickByText("ChannelApe - T14276 and T14277");
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EXPORT_BUBBLE);

    await io.flowBuilder.click(selectors.importPagePO.IMPORTLOOKUP);

    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    let textAtResource = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toString();
    await io.assert.expectToContainValue('Actions', textAtResource, "Contacts is not showing properly in Resources Dropdown");

    let textAtAPIEndpoint = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION)).toString();
    await io.assert.expectToContainValue('Get action', textAtAPIEndpoint, "Search company contacts is not showing properly in API Endpoint Dropdown");

    await io.homePage.click(selectors.basePagePO.CLOSE);

    await io.myAccountPage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.flowBuilder.waitForElementAttached(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);

    textAtResource = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE)).toString();
    await io.assert.expectToContainValue('Actions', textAtResource, "Trackingfield is not showing properly in Resources Dropdown");

    textAtAPIEndpoint = (await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION)).toString();
    await io.assert.expectToContainValue('Complete action', textAtAPIEndpoint, "Update a tracking field is not showing properly in API Endpoint Dropdown");

    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_FLOW_BUILDER);

    await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 1);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.waitForElementAttached(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);

    await io.flowBuilder.loadingTime();
  });
});
