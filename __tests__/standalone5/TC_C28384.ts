import { test, expect, links } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28384 & TC_C28386", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T883 @Zephyr-IO-T885 @Env-All TC_C28384 & TC_C28386 Verify able to access Account Dashboard upon clicking the Dashboard option from the left navigation bar", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    await io.assert.verifyElementContainsText('h3', 'Dashboard');
  });
});
