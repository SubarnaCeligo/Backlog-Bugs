import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68492 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", () =>{

    test("@Env-All @Zephyr-IO-T17396 C68492 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", async({
               io,
                page
              }) => {
              await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
              await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
              await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,"TC_C68492_DND")
              await io.integrationPage.waitForElementAttached("[data-test='openActionsMenu']");
              await io.flowBuilder.clickByText('TC_C68492_DND');
              await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION)
              await io.homePage.click(selectors.homePagePO.SANDBOX)
              await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_NAME);
              await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT,'Clone - TC_C68492');
              await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON)
              await io.homePage.click(selectors.homePagePO.STAY_IN_SANDBOX)
              await io.marketplacePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON)
              await io.homePage.click(
                selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
              );
              await io.homePage.clickByText("Use existing connection");
              await io.homePage.clickByText("Please select");
              await io.homePage.clickByTextByIndex("FTP CONNECTION SANDBOX",0)
              await io.connectionPage.click(selectors.basePagePO.SAVE);
              await io.homePage.click(selectors.basePagePO.INSTALL);
              await io.homePage.clickByTextByIndex("Clone - TC_C68492", 0)
              await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    });
})
