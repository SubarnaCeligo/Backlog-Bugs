import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T14275 Install an Asana template from marketplace and verify export bubble data in SIMPLE form is rendered properly", () => {
  test("@Zephyr-IO-T14275 @Env-All C58071 Install an Asana template from marketplace and verify export bubble data in SIMPLE form is rendered properly", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE);
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, "Certify - NetSuite");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.INSTALL_TEMPLATE);
    await io.homePage.clickByText("Install now");
    await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.flowBuilder.clickByTextByIndex("Use existing connection", 0);
    await io.flowBuilder.clickByTextByIndex("Please select", 0);
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("CERTIFY CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId);
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
    await io.homePage.click(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON);
      await io.homePage.clickByText("Use existing connection");
      await io.homePage.clickByText("Please select");
      connId = connMap.get("NETSUITE CONNECTION");
      await io.connectionPage.selectTextfromDropDown(page, connId)
      await io.connectionPage.click(selectors.basePagePO.SAVE);

      await io.homePage.click(selectors.basePagePO.INSTALL);
      await io.homePage.loadingTime()
      await io.homePage.click(selectors.basePagePO.INSTALL);
      await io.homePage.loadingTime()

    await io.flowBuilder.clickByText("Flows");
    await io.flowBuilder.clickByText('Certify expense reports to NetSuite expense reports');
    await io.exportsPage.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    const resource = await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    const operation = await io.exportsPage.getText(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    expect(resource).toBe("Expensereports");
    expect(operation).toBe("List expense reports");
  });
});
