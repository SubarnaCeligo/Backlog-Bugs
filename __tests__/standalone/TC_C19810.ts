
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C19810", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T1406 TC_C19810", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("*** Clicking on Profile Menu ***", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on My Account ***", async ()=>{});

    var validation = await io.homePage.isVisible(selectors.flowBuilderPagePO.DEVELOPER_MODE);
    await io.assert.expectToBeTrue(validation, "");
    test.step("*** The 'Developer option' should is displayed ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
