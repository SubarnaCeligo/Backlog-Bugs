
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C24487 from "@testData/EM2.0/TC_C24487.json";
  
test.describe("TC_C24487", () => {
  let flows;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7207 |check resolve dropdown with search filters with <1000 errors in the error table", async ({io, page}) => {
    //Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C24487);
await test.step(
      "***Created Flow " +
        flows.get(TC_C24487.name)["flowName"] +
        " With ID " +
        flows.get(TC_C24487.name)["flowId"] +
        " ***",async () => {
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C24487.name,
      flows.get(TC_C24487.name)["flowId"],
      [1, 0, 1]
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C24487.name)["flowId"]
    );
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    await page.locator(
      selectors.integrationPagePO.HOME_SEARCH
    ).fill("failure");
    await io.homePage.loadingTime();
    

    //Clicking Top Checkbox
    await io.homePage.click(
      selectors.myAccountPagePO.ERROR_CHECKBOX
    );
    
    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );
    
    const dropDownLocator =
      selectors.flowBuilderPagePO.DROPDOWN;
    const arr = ["1 selected error", "All matching errors"];
    let arrvalue1 = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    await io.assert.expectToContainValue(arr[0], arrvalue1[1], "");
    await io.assert.expectToContainValue(arr[1], arrvalue1[2], "");
  });
});
