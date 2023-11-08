import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.only("C68493 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", () =>{

    test("C68493 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", async({
               io,
                page
              }) => {
                
              await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
              await io.homePage.click(selectors.homePagePO.SANDBOX_BUTTON)
              await io.homePage.waitForElementAttached(`:has-text("1 - TC_C68492-DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
              await io.homePage.click(`tbody tr:has-text("1 - TC_C68492-DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
              await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION)
              await io.homePage.click(selectors.homePagePO.PRODUCTION)
              await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON)
              await io.homePage.click(selectors.homePagePO.STAY_IN_PRODUCTION)
              await io.marketplacePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON)
              await io.homePage.click(
                selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
              );
              await io.homePage.clickByText("Use existing connection");
              await io.homePage.clickByText("Please select");
               await io.homePage.clickByTextByIndex("FTP CONNECTION",0)
                await io.connectionPage.click(selectors.basePagePO.SAVE);
              await io.homePage.click(
                selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
              );
              await io.homePage.clickByText("Use existing connection");
              await io.homePage.clickByText("Please select");
              await io.homePage.clickByTextByIndex("HTTP MIVA CONNECTION",0)
              await io.connectionPage.click(selectors.basePagePO.SAVE);
              await io.homePage.click(selectors.basePagePO.INSTALL);
              await io.homePage.clickByTextByIndex("Clone - 1 - TC_C68492-DND", 0)
              await io.assert.verifyElementIsDisplayed( selectors.basePagePO.EDIT_SCHEDULE,"Scheduling is not present")
               
              
    });
})