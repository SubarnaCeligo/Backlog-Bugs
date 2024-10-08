
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import constants from "@testData/EM2.0/constants.json";
import TC from "@testData/EM2.0/TC_C19874_TC_C20017_TC_C20849.json";
import TC1 from "@testData/EM2.0/TC_C19874_TC_C20017_TC_C20849_2.json";
import { allure } from "allure-playwright";

test.describe("TC_C19874 | TC_C20017 | TC_C20849", () => {
  let flowId: string;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T7280 TC_C19874 | Able to search the errors - resolved errors", async ({io, page}) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = flows.get(TC.name)["flowId"];
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flowId,
      [0, 0, 2001]
    );

    await io.homePage.delay(30000);

    for (var i = 0; i < 2; i++) {
      await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
      await io.homePage.loadingTime();
      await io.homePage.delay(10000);
      await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
      await io.homePage.loadingTime();
      await io.homePage.isPageReady();

      await io.homePage.click(
        selectors.integrationPagePO.RESOLVEJOBS
      );

      await io.homePage.loadingTime();
      var button = await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL)
      var resp = await button.isVisible();
      await io.assert.expectToBeTrue(resp, "");
      await button.click();
      await io.homePage.click(
        selectors.integrationPagePO.RESOLVE
      );
      await io.homePage.reloadPage();
      await io.homePage.reloadPage();
    }

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );

    await io.homePage.loadingTime();
    var button = await page.locator(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL)
    var resp1 = await button.isVisible();
    await io.assert.expectToBeTrue(resp1, "");
    await button.click();
    await io.homePage.click(
      selectors.integrationPagePO.RESOLVE
    );
    await io.homePage.reloadPage();

    await io.api.checkJobStatusFromAPI(
      TC.name,
      flowId,
      [0, 0, 2001]
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "invalid");
    let res = await io.flowBuilder.verfiyErrorsCountByPages("1000+");
    await io.assert.expectToBeTrue(res, "");
await test.step(
      "*** Verified Able to search the errors - resolved errors"
, async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7382 TC_C20017 | View retrying error status", async ({io,page}) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC1);
    flowId = flows.get(TC1.name)["flowId"];
    await io.api.checkJobStatusFromAPI(
      TC1.name,
      flowId,
      [0, 0, 50]
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.ERROR_BUBBLE);
    await io.homePage.loadingTime();
    await page.locator("table>thead>tr>th").nth(9).click();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_SELECTED);
    await io.homePage.delay(5000);
    var status = await page.getByText("Retrying errors...");
    var stat = await status.nth(1).textContent();
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.assert.expectToBeValue(String(stat), "Retrying errors...", "");
    var stat1 = await status.nth(0).textContent();
    await io.assert.expectToBeValue(String(stat1), "Retrying errors...", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T7393 TC_C20849 | Verify Step error drawer is having new columns", async ({io, page}) => {
    var integrationURL = process.env["IO_Integration_URL"]
    flowId = await io.api.getFlowId("Mysql to mysql flow_DND");
    await io.homePage.navigateTo(integrationURL + `flows/${flowId}/errorsList`);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const headings =
      ".MuiPaper-elevation16 .MuiTableRow-head th";
    const columns = constants.stepsErrorList.columns;
    let res = await io.homePage.verifyAllColumnsPresent(
      headings,
      columns
    );
    await io.emailPage.closeWindow();
    await io.assert.expectToBeTrue(res, "");
  });
});
