
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
  

test.describe("TC_C24623 | Golden", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7217 TC_C24623| Verify the behaviour of Retry & Resolve dropdown with <1000 errors on account with ALL monitor and one Manage tile", async ({io,page}, testInfo) => {
    var flowName = "TC_027_C24623_DND";
    var flowId = await io.api.getFlowId(flowName);
    test.step("*** Navigate to the flow ***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );

    await io.homePage.loadingTime();
    const dropDownLocator =
      selectors.flowBuilderPagePO.DROPDOWN;

    let items = ["2 retriable errors", "All retriable errors"];
    let ispresent = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    expect(ispresent).toContain(items[0]);
    expect(ispresent).toContain(items[1]);
    test.step("Verified the Retry Jobs dropdown", async ()=>{});

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageLoaded();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    await io.homePage.loadingTime();
    
    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );

    items = ["2 selected errors", "All errors"];
    ispresent = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    expect(ispresent).toContain(items[0]);
    expect(ispresent).toContain(items[1]);
    test.step("Verified the Resolve Jobs dropdown", async ()=>{});
  });
});
