import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Verify Base URI is not present in Shopify Connection page", () => {

    test.beforeEach(async ({ io }) => {
      await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      });

      test ("Verify Base URI is not present in Shopify Connection page", async ({io,page}) => {
 
        await io.connectionPage.clickByText('Create connection')
        await io.connectionPage.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION)
 
        const usernameFieldSelector = selectors.connectionsPagePO.MOCK_BASEURL; // Replace with the actual selector
      
        // Use page.$() to check if the username field element is present
        const usernameFieldElement = await page.$(usernameFieldSelector);
        expect(usernameFieldElement).toBeFalsy();

      });
});
