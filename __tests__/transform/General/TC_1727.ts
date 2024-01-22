
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C1727", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C1727_Sandbox_account_Verification", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Home page ***",()=>{});
    await io.homePage.isPageLoaded();
    var input2 = await io.homePage.isVisible(
      selectors.homePagePO.SANDBOX
    );
    expect(input2).toBeTruthy();
    await test.step("*** Verifying Sandbox Account ***",()=>{});
  });
});
