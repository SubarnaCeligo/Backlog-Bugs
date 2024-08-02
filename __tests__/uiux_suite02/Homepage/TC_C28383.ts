import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28383 Verify Dashboard is added in the left navigation bar below Home button", () => {
    test("@Env-All @Zephyr-IO-T882 C28383 Verify Dashboard is added in the left navigation bar below Home button", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached(selectors.homePagePO.LEFT_MENU_ANCHOR_LIST);
        await io.assert.verifyElementAttribute(`:nth-match(${selectors.homePagePO.LEFT_MENU_ANCHOR_LIST}, 1)`, 'data-test', 'Home');
        await io.assert.verifyElementAttribute(`:nth-match(${selectors.homePagePO.LEFT_MENU_ANCHOR_LIST}, 2)`, 'data-test', 'account-dashboard');
    });
  });