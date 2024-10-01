
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C25629.json";
test.describe("TC_C24486", () => {
  let flows;
  let scriptId: string;

  test.beforeEach(async ({io}) => {
    scriptId = await io.api.getScriptId(TC.scriptBody.name);
    if (!scriptId) {
      scriptId = await io.api.createScriptViaAPI(
        TC.scriptBody
      );
    }
    TC.qa__api_tdata[0].pageGenerators[0].qa__export.hooks.preSavePage._scriptId =
      scriptId;
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flows.get(TC.name)["flowId"]]);
  });
  test("@Env-All @Zephyr-IO-T7206 |Verify the resolve dropdown with error table which has <50 errors", async ({io, page}) => {
    //*Create Flows
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
      [0, 0, 1]
    );
    test.step("***Clicked On Flow Which Has Errors***", async ()=>{});
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC.name)["flowId"]
    );
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.myAccountPagePO.ERROR_CHECKBOX
    );
await test.step(
      "***Selected An Error By Clicking On Checkbox***"
, async ()=>{});

    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );
    test.step("***Clicked On Resolved Dropdown ***", async ()=>{});

    const list = selectors.flowBuilderPagePO.DROPDOWN;
    const items = ["1 selected error", "All errors"];
    let ispresent = await io.flowbranching.flowBranchingPage.getList("[role='option']");
    await io.assert.expectToContainValue(items[0], ispresent[1], "");
    await io.assert.expectToContainValue(items[1], ispresent[2], "");

    test.step(items[1] + " Displayed In Resolve Dropdown", async ()=>{});
  });
});
