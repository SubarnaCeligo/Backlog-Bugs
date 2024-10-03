import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C2822", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await test.step("*** Navigate to Home Page ***",()=>{});
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T2236 @Env-All TC_C2822", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo("https://eu.integrator.io ");
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Navigated to https://eu.integrator.io ***",async ()=>{});
    var text = await io.homePage.isVisible('text= "Sign in with Google"');
    await io.assert.expectToBeFalse(text,"")
    await test.step("*** Sign with google option is not visible. ***",()=>{});
  });
});
