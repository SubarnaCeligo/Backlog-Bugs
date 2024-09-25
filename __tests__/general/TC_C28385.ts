import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C28385", () => {
  test.beforeEach(async ({io}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T884 @Env-All TC_C28385", async ({io,page}, testInfo) => {

    await io.homePage.isVisible('[data-test="account-dashboard"]');
    await io.homePage.click('[data-test="account-dashboard"]');
    await test.step("***Clicked on Dashboard present in the left navigation bar ***",()=>{});
    await io.homePage.isVisible(selectors.flowBuilderPagePO.DASHBOARD1);
    var value = (await io.homePage.getText(selectors.integrationPagePO.INTEGRATIONNAME)).toString()
    await io.assert.expectToBeValue(value, "Dashboard", "");
    await test.step("***Verified we should be redirected to the Account dashboard page ***",()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await test.step(" Navigating to Home Page",()=>{});
  });
});
