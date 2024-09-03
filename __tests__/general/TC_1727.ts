import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1727", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T2232 @Env-All TC_C1727_Sandbox_account_Verification", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Home page ***",()=>{});
    await io.homePage.loadingTime();
    var input2 = await io.homePage.isVisible(selectors.homePagePO.SANDBOX_BUTTON);
    await io.assert.expectToBeTrue(input2, "");
    await test.step("*** Verifying Sandbox Account ***",()=>{});
  });
});
