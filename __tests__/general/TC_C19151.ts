import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C19151", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***",()=>{});
  });

  test("@Zephyr-IO-T2242 @Env-All  TC_C19151", async ({io,page}, testInfo) => {
    await io.homePage.click(
      selectors.homePagePO.CLONE_INTEGRATION
    );
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.homePagePO.NAMEFIELDHELPICON
    );
    const helpText = await (await page.$("(//*[@data-test='yesContentHelpful']/../../..//div)[1]")).textContent();
    await expect(helpText).toEqual(
      "Name your integration so that you can easily reference it from other parts of the application."
    );

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

  });
});
