import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28383 Verify Dashboard is added in the left navigation bar below Home button", () => {
    test("C28383 Verify Dashboard is added in the left navigation bar below Home button", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.addStep('Getting main menu list of new view');
        await io.homePage.waitForElementAttached(selectors.homePagePO.LEFT_MENU_ANCHOR_LIST);
        const leftBarAnchors = await page.locator(selectors.homePagePO.LEFT_MENU_ANCHOR_LIST).all();
        await io.homePage.addStep('Checking Home is above Dashboard');
        expect(await leftBarAnchors[0].getAttribute('data-test')).toBe('Home');
        expect(await leftBarAnchors[1].getAttribute('data-test')).toBe('account-dashboard');
    });
  });