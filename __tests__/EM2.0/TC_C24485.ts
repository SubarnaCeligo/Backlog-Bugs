
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C24485 from "@testData/EM2.0/TC_C24485.json";

test.describe("TC_C24485", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T7205 TC_C24485|Verify the resolve dropdown with error table which has <1000 errors", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C24485);
await test.step(
      "Created Flow " +
        flows.get(TC_C24485.name)["flowName"] +
        " With ID " +
        flows.get(TC_C24485.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      TC_C24485.name,
      flows.get(TC_C24485.name)["flowId"],
      [50, 0, 50]
    );
    var flowId = flows.get(TC_C24485.name)["flowId"];
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flowId
    );
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();
    
    await io.homePage.clickButtonByIndex(
      ".MuiCheckbox-root",
      1
    );
await test.step(
      "***Selected An Error By Clicking On Checkbox***"
, async ()=>{});

    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );
    test.step("***Clicked On Resolved Dropdown ***", async ()=>{});
    const dropDownLocator =
      selectors.flowBuilderPagePO.DROPDOWN;

    const items = ["1 selected error", "All errors"];
    let ispresent = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    await io.assert.expectToContainValue(items[0], ispresent[1], "");
    await io.assert.expectToContainValue(items[1], ispresent[2], "");
  });
});
