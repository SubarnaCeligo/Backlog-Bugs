
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28405", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T6351 @Env-All TC_C28405", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.DASHBOARD);

    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    await io.homePage.click(selectors.flowBuilderPagePO.INTEGRATION_BUTTON_UPDATED);

    var res = await io.homePage.isVisible(selectors.flowBuilderPagePO.INTEGRATION_FLOW_FILTER);
    await io.assert.expectToBeTrue(res, "");
    test.step("*** We can see the list of integrations and its child integrations ***", async ()=>{});
  });
});
