import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C68493 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", () =>{

    test("C68493 Verify user is able to clone the integration from Sandbox env. having multiple flows with enabled scheduling", async({
               io,
                page
              }) => {
                
              await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL)
              await io.homePage.click('[data-test="Sandbox"]')
              await io.homePage.waitForElementAttached(`:has-text("1 - TC_C68492-DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
              await io.homePage.click(`tbody tr:has-text("1 - TC_C68492-DND") ${selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU}`);
              await io.homePage.click('[data-test="cloneIntegration"]')
              await io.homePage.click('[data-test="production"]')
              await io.homePage.click('[data-test="Clone integration"]')
              await io.homePage.click('[data-test="No, stay in Production"]')
              await io.marketplacePage.waitForElementAttached(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON)
              await io.homePage.click(
                selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
              );
              await io.homePage.clickByText("Use existing connection");
              await io.homePage.clickByText("Please select");
              await page
                .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
                .getByText("FTP CONNECTION").first()
                .click();
                await io.connectionPage.click(selectors.basePagePO.SAVE);
                await page.waitForTimeout(3000);
              await io.homePage.click(
                selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
              );
              await io.homePage.clickByText("Use existing connection");
              await io.homePage.clickByText("Please select");
              await page
                .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
                .getByText("HTTP MIVA CONNECTION")
                .click();
              await io.connectionPage.click(selectors.basePagePO.SAVE);
              await io.homePage.click(selectors.basePagePO.INSTALL);
              await io.homePage.clickByTextByIndex("Clone - 1 - TC_C68492-DND", 0)
              await io.assert.verifyElementIsDisplayed('[aria-label="Edit schedule"]',"Scheduling is not present")
               
              
    });
})