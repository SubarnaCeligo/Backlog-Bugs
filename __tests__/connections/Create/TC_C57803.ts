import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C57803_Verify giving invalid base URI by unselecting the Configure refresh token checkbox and check whether the refresh token is generating or not", () => {
    test("TC_C57803_Verify giving invalid base URI by unselecting the Configure refresh token checkbox and check whether the refresh token is generating or not UI_Backlog", async ({ io }, testInfo) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
            await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Magento 2');
            await io.homePage.clickByTextByIndex('Magento 2', 0);
            await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
            await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C57803_Connection');
            await io.homePage.clickByTextByIndex('Configure refresh token', 0);
            await io.homePage.fill(selectors.importPagePO.PASSWORD, 'celigo123');
            await io.homePage.fill(selectors.connectionsPagePO.MAGNETO_HTTP_URI, 'baseuri');
            await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SAVEANDCLOSE);
            await io.assert.verifyElementContainsText(selectors.integrationPagePO.DELETE_CONF_DIALOG_CONTENTS,'Are you sure you want to save this connection? Test connection failed with the following error: Invalid URI:')
        });
    });

});
