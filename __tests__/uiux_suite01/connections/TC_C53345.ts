import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53345 Verify Base URI is not present in UPS Edit Connection page", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      });
      

      test ("Verify Base URI is not present in UPS Edit Connection page", async ({io,page}) => {
        
        await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_SEARCH);
        await io.connectionPage.click(selectors.connectionsPagePO.UPS_CONNECTION)
 
        const fieldSelector = selectors.connectionsPagePO.MOCK_BASEURL; 
      
        // Use page.$() to check if the username field element is present
        const fieldElement = await page.$(fieldSelector);
        expect(fieldElement).toBeFalsy();

      });
});