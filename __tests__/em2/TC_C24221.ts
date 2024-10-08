
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C24221", () => {
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7196 TC_C24221|check retry dropdown with search filters with >1000 errors in the error table", async ({io, page}) => {
    var flowId = await io.api.getFlowId("Mysql to mysql flow_DND");
    var searchFilter = "error";
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.changeErrorDrawerView()
    await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill(searchFilter);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    test.step("Clicked On Retry Dropdown ", async ()=>{});

    const arr = ["50 retriable errors", "1000 matching retriable errors"];
    let arrvalue1 = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    await io.assert.expectToContainValue(arr[0], arrvalue1[1], "");
    await io.assert.expectToContainValue(arr[1], arrvalue1[2], "");
  });
});
