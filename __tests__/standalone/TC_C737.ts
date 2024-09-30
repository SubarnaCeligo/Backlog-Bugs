
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C737", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1388 TC_C737", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Clicking on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicking on My Account ***", async ()=>{});

    var validation = await io.homePage.isVisible(selectors.flowBuilderPagePO.ROLE_FIELD);
    await io.assert.expectToBeTrue(validation, "");

    test.step("*** The Role field is present ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
