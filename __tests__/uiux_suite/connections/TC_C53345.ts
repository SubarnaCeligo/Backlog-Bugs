import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53345 Verify Base URI is not present in UPS Edit Connection page", () => {

    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
      });

      test ("C53345 Verify Base URI is not present in UPS Edit Connection page", async ({io,page}) => {
        await io.connectionPage.clickByText('Create connection');
        await page.waitForTimeout(5000);
        await io.connectionPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT,"UPS");
        await page.locator(selectors.connectionsPagePO.UPS_CONNECTION).scrollIntoViewIfNeeded();
        await io.connectionPage.click(selectors.connectionsPagePO.UPS_CONNECTION);
 
        const fieldSelector = selectors.connectionsPagePO.MOCK_BASEURL; // Replace with the actual selector
      
        // Use page.$() to check if the username field element is present
        const fieldElement = await page.$(fieldSelector);
        expect(fieldElement).toBeFalsy();

      });
});