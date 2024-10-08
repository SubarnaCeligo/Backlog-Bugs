
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import constants from "@testData/EM2.0/constants.json";

test.describe("TC_C29025_Dashboard_Open_Errors_Columns_Validation", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T6402 TC_C29025_Dashboard_Open_Errors_Columns_Validation", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.isPageReady();
    await io.homePage.click(
      await selectors.flowBuilderPagePO.COMPLETED_FLOWS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonBasedOnLabelName(
      "thead th",
      "Open errors"
    );
    await io.homePage.clickButtonBasedOnLabelName(
      "thead th",
      "Open errors"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilderDashboard.changeErrorDrawerView();

    var data = constants.errorDrawer.openErrors;
    // var table = await page.locator("table").nth(1);
    var table = await page.locator(".MuiTable-root:nth-child(1)").nth(1);
    var expec = await table.locator('thead th').allTextContents();
    expec = expec.map((x) => x.trim());
    await expect(expec).toEqual(data);
    await io.emailPage.closeWindow();
  });
});
