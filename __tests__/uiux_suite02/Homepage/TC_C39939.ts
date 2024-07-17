
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


// can be automate only in a account which doesn't have agents
test.describe.skip(' C39939 Verify the message under resources tab if we do not have any imports,agents,exports in the IO', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
  
    test('@Env-All @Zephyr-IO-T909 Verify the message under resources tab if we do not have any imports,agents,exports in the IO', async({io,page}) => {
  
        await io.homePage.goToMenu("Resources", "Agents");
         await io.assert.verifyElementTextByIndex(selectors.basePagePO.H3_TEXT_SELECTOR, "You don’t have any agents", 1);
       
    });
  })