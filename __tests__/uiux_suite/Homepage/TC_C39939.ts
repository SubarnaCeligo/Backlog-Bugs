
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(' C39939 Verify the message under resources tab if we do not have any imports,agents,exports in the IO', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test('Verify the message under resources tab if we do not have any imports,agents,exports in the IO', async({io,page}) => {
  
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.connectionPage.clickByText('Agents')
  
  
        const elementSelector = selectors.basePagePO.H3_TEXT_SELECTOR; // Combine the classes
  
        // Find the element using the selector
        const element = await page.locator(elementSelector);
        
        // Get the text content of the element
        const elementText = await element.textContent();
        
        // Define the expected text
        const expectedText = "You don’t have any agents";
        
        // Assert that the actual text matches the expected text
        expect(elementText).toBe(expectedText);
       
    });
  })