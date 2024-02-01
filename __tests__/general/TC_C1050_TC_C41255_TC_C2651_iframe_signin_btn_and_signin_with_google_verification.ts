
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1050_TC_C41255_TC_C2651", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1050_TC_C41255_TC_C2651", async ({io,page}, testInfo) => {
    await(await page.locator(selectors.homePagePO.HOME_PROFILE_MENU)
    ).isVisible();
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);

    await io.homePage.isPageLoaded();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    var iframe_exists = await io.homePage.isVisible("//iframe[@title='Announcement']");
    await io.assert.expectToBeTrue(iframe_exists, "");

    var sigin_btn = await io.assert.checkElementState(selectors.basePagePO.SUBMIT, "isDisabled");
    await io.assert.expectToBeTrue(sigin_btn, "");

    await io.homePage.click("//button[contains(text(),'Sign in with Google')]");
    await io.homePage.isPageLoaded();
    var google_sigin_btn_resp = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue(google_sigin_btn_resp, "https://accounts.google.com/", "");

    await io.signInPage.navigateToTheSiginPage();
    await io.signInPage.signInToIO();
  });
});
