import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C52794_Verify if the saving fails then the use should be able to do the save and authorize again in create connection page", () => {
  test("@Env-All @Zephyr-IO-T1129 TC_C52794_Verify if the saving fails then the use should be able to do the save and authorize again in create connection page UI_Backlog", async ({ io }, testInfo) => {
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    //Creating Connection 
    await test.step("*** Creating Connection ***", async () => {
      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Shopify');
      await io.homePage.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION);
      await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C52794_Connection');
      await io.homePage.fill(`${selectors.connectionsPagePO.STORE_NAME_ID} input`, 'TC_C52794');
      await io.homePage.fill(selectors.connectionsPagePO.USERNAME, 'Test');
      await io.homePage.fill(selectors.connectionsPagePO.PASSWORD, 'Test');
      await io.homePage.click(selectors.basePagePO.SAVE);
      await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
      //Validating able to save&Authorize but visible
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SAVE, "save&Authorize is not avaialble")
    });
  });

});
