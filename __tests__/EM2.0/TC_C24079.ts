
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

  

test.describe("TC_C24079", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7192 TC_C24079", async ({io,page}, testInfo) => {
    test.step("Clicking on the flow TC_027_C24624", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickByText("Mysql to mysql flow_DND");

    test.step("***Clicked On Flow Which Has Errors***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);

    
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    const items = ["50 retriable errors", "1000 retriable errors"];

    let ispresent = await io.flowbranching.flowBranchingPage.getList("li");
    expect(ispresent).toContain(items[0]);
    expect(ispresent).toContain(items[1]);
    test.step("Verified the Retry Jobs dropdown", async ()=>{});
  });
});
