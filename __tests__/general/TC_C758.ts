import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";


test.describe("TC_C758", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await io.goToFlowsPage();
    await test.step("*** Go to flows page ***", () => { });
  });

  test("@Zephyr-IO-T2225 @Env-All  TC_C758", async ({ io, page }, testInfo) => {
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADMINTAB
    );
    await io.homePage.click(selectors.flowBuilderPagePO.README);
    await io.homePage.click(
      selectors.basePagePO.LAUNCH_EDITOR
    );
    var result = await io.assert.checkElementState(
      selectors.basePagePO.MFA_SAVE
      , "isDisabled");
    await test.step(
      "*** Save Button Is Disabled When Nothing Is Added To The ReadMe file ***"
      , async () => { });
    expect(result).toBeFalsy();
  });
});
