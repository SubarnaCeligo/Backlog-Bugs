import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("CONNECTIONS", () => {
    test("TC_C59412_Verify scope section is not available in Shopify New and Existing connection in Production and Sandox", async ({ io }, testInfo) => {
        await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
        //Creating Connection 
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
        await io.homePage.clickByText("Shopify");
        await io.assert.expectNotToBeValue("Configure scopes", "configure scopes", "Configure scopes available")
    });

});
