
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C24216 from "@testData/EM2.0/TC_C24216.json";

test.describe("TC_C24216", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7441 TC_C24216|Verify the retry dropdown with error table which has <50 errors", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C24216);
await test.step(
      "Created Flow " +
        flows.get(TC_C24216.name)["flowName"] +
        " With ID " +
        flows.get(TC_C24216.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      TC_C24216.name,
      flows.get(TC_C24216.name)["flowId"],
      [20, 0, 20]
    );
    var flowId = flows.get(TC_C24216.name)["flowId"];
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flowId
    );
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.myAccountPagePO.ERROR_CHECKBOX
    );
    
    test.step("Selected An Error By Clicking On Checkbox", async ()=>{});

    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    test.step("Clicked On Retry Dropdown", async ()=>{});
    const dropDownLocator =
      selectors.flowBuilderPagePO.DROPDOWN;
    const items = ["20 retriable errors", "All retriable errors"];

    let ispresent = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    await io.assert.expectToContainValue(items[0], ispresent[1], "");
    await io.assert.expectToContainValue(items[1], ispresent[2], "");
});
})
