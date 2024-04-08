import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C29068_Verify that Hybrid connection (SP-API and MWS) connection can be successfully saved without providing the Seller ID", () => {
    test("@Env-All TC_C29068_Verify that Hybrid connection (SP-API and MWS) connection can be successfully saved without providing the Seller ID UI_Backlog", async ({ io }, testInfo) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        //Creating Connection 
        await test.step("*** Creating Connection ***", async () => {
            await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
            await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_SEARCH, 'Amazon Seller Central');
            await io.connectionPage.click(selectors.flowBuilderPagePO.AMAZONSELLER);
            await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C29068_Connection');
            await io.homePage.clickByTextByIndex('Please select', 0);
            await io.homePage.clickByText('Hybrid Selling Partner API (SP-API and MWS)');
            await io.homePage.clickByTextByIndex('Please select', 0);
            await io.homePage.clickByText('North America');
            await io.homePage.clickByTextByIndex('Please select',0);
            await io.homePage.clickByText('United States of America');
            //Validating without seller id able to save&Authorize
            await io.homePage.click(selectors.basePagePO.SAVE);
        });
    });

});
