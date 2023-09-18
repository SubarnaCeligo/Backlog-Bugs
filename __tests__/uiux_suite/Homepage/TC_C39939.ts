
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(' C39939 Verify the message under resources tab if we do not have any imports,agents,exports in the IO', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test('Verify the message under resources tab if we do not have any imports,agents,exports in the IO', async({io,page}) => {
  
        await io.homePage.goToMenu("Resources", "Agents");
        const elementSelector = selectors.basePagePO.H3_TEXT_SELECTOR; // Combine the classes
        await io.homePage.waitForElementAttached(elementSelector)
         await io.assert.verifyElementText(elementSelector, 'You don’t have any agents')
       
    });
  })