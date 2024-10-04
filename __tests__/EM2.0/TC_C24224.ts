
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C24224.json";
test.describe("TC_C24224", () => {
  let flows;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flows.get(TC.name)["flowId"]]);
  });
  test("@Env-All @Zephyr-IO-T7197 TC_C24224|Verify the retry dropdown with search filters with <1000 errors in the error table", async ({io, page}) => {
    //Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
await test.step(
      "***Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flows.get(TC.name)["flowId"] +
        " ***",async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flows.get(TC.name)["flowId"],
      [1, 0, 1]
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC.name)["flowId"]
    );
    test.step("***Clicked On Flow Which Has Errors***", async ()=>{});
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    //Filter Search Bar
    const inputSearch = await page.locator(
      selectors.integrationPagePO.HOME_SEARCH
    );
    await inputSearch.isVisible();
    await inputSearch.click();
    await inputSearch.fill("error");
    await io.homePage.loadingTime();
    
    test.step("***Filtered Errors Using SearchBar***", async ()=>{});

    //Clicking Top Checkbox
    await io.homePage.click(
      selectors.myAccountPagePO.ERROR_CHECKBOX
    );
    await io.homePage.loadingTime();
await test.step(
      "***Selected An Error By Clicking On Checkbox***"
, async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    test.step("***Clicked On Retry Dropdown ***", async ()=>{});

    const list = selectors.flowBuilderPagePO.DROPDOWN;
    const listMsgs = ["5 retriable error", "All matching retriable errors"];
    let ispresent = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    await io.assert.expectToContainValue(listMsgs[0], ispresent[1], "");
    await io.assert.expectToContainValue(listMsgs[1], ispresent[2], "");
    test.step(listMsgs[1] + " Displayed In Retry Dropdown", async ()=>{});
  });
});
