import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


// can be automate only in a account which doesn't have agents
test.describe('C39939 Verify the message under resources tab if we do not have any imports,agents,exports in the IO', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test('@Env-All @Zephyr-IO-T909 Verify the message under resources tab if we do not have any imports,agents,exports in the IO', async({io,page}) => {

        await io.homePage.goToMenu("Resources", "Agents");
        await io.homePage.loadingTime();
        await io.assert.verifyElementDisplayedByText("You don’t have any agents", "Message is not displayed");
    });
  })