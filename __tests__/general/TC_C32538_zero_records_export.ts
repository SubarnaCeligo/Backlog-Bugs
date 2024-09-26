import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/GENERAL/TC_C32538_zero_records_export.json";

test.describe("TC_C32538", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T2270 @Env-All TC_C32538", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);

    var id = await io.api.getFlowId(FTP.name);

    await io.flowBuilder.navigateToTheFlow( id);
    await io.homePage.loadingTime();

    await io.api.checkJobStatusFromAPI(  FTP.name, id);

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await(await page.locator(selectors.myAccountPagePO.DASHBOARDJOBS)
    ).isVisible({ timeout: 10000 });
    let importJob = await page.$$(
      selectors.myAccountPagePO.DASHBOARDJOBS
    )
    let importJobCount = importJob.length
    await await io.assert.expectToBeValue(String(importJobCount), "1", "");


    var resultJSON = await io
      .flowBuilder.validateJobCountFromDashBoard(FTP.name, FTP.qa__expectedDashboardCount)

    await io.api.deleteFlowsWithId([flows.get(FTP.name)["flowId"]]);

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
