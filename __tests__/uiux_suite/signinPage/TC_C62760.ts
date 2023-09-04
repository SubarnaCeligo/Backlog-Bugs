import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip("C62760 TO verify that the iFrame is loading fine when user log outs from IO account", () => {
    test("C62760TO verify that the iFrame is loading fine when user log outs from IO account", async ({io, page}) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
        await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
        await io.homePage.click(selectors.homePagePO.SIGN_OUT)
        expect(await page.locator(selectors.loginPagePO.IFRAME)).toBeVisible();
    });
});
