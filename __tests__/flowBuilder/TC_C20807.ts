
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C20807.json";

test.describe("TC_C20807", () => {
  let flowId;

  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Flow Page ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(flowId);
    test.step("** Deleted flow **", async () => { });
  });

  test("@Env-All @Zephyr-IO-T2971", async ({ io, page }) => {
   await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
   await io.homePage.loadingTime();
    const header = await page.locator(selectors.flowBuilderPagePO.ORDER_HEADING).nth(1).textContent();
    const header1 = await page.locator(selectors.flowBuilderPagePO.ORDER_HEADING).nth(2).textContent();
    const header2 = await page.locator(selectors.flowBuilderPagePO.ORDER_HEADING).nth(3).textContent();
    const header3 = await page.locator(selectors.flowBuilderPagePO.ORDER_HEADING).nth(4).textContent();
    const header4 = await page.locator(selectors.flowBuilderPagePO.ORDER_HEADING).nth(5).textContent();
    expect(header).toContain('Message');
    expect(header1).toContain('Code');
    expect(header2).toContain('Source');
    expect(header3).toContain('Classification');
    expect(header4).toContain('Timestamp');
    
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Error fields');
    await io.homePage.loadingTime();
    const errors = await page.locator('[class="ace_text-input"]');
    await expect(errors.getAttribute("readOnly")).toBeTruthy();

    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const checked = await page.getByText('Show timestamps as relative').isChecked();

    if (checked == true) {
    } else {
      await io.homePage.click(selectors.myAccountPagePO.SHOWTIMESTAMPRELATIVE);
      await io.homePage.click(
        selectors.basePagePO.MFA_SAVE
      );
    }
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    expect(await page.locator(selectors.myAccountPagePO.LOCAL_DATE_TIME).nth(4)).toBeVisible();


    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    test.step("***Clicked On Profile Options***", async () => { });

    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("***Clicked On Profile Menu***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.myAccountPagePO.SHOWTIMESTAMPRELATIVE);
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    await io.homePage.isPageReady();
  });
});
