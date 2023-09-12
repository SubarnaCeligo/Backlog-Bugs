import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C28383 Verify Dashboard is added in the left navigation bar below Home button", () => {
    test("C28383 Verify Dashboard is added in the left navigation bar below Home button", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.waitForElementAttached('.MuiDrawer-paperAnchorLeft ul a');
        const leftBarAnchors = await page.locator('.MuiDrawer-paperAnchorLeft ul a').all();
        expect(await leftBarAnchors[0].getAttribute('data-test')).toBe('Home');
        expect(await leftBarAnchors[1].getAttribute('data-test')).toBe('account-dashboard');
    });
  });