
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C19140_Help_centre", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Navigate to Home Page ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C19140_Help_centre", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.HELP);
    await test.step("*** Help center selected ***",()=>{});

    var text = await io.homePage.isVisible(
      "[data-test='help_center']"
    );
    await test.step("Verified the Help centre  on home screen",()=>{});
    expect(text).toBeTruthy();
    await io.homePage.click("[data-test='help_center']");
    await test.step("*** Clicking on Help centre button ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var texts = await io.homePage.isVisible(
      "[id='main-content']"
    );
await test.step(
      " verified the User should be able to navigate to  the help centre articles successfully"
, async ()=>{});
    expect(texts).toBeTruthy();
  });
});
