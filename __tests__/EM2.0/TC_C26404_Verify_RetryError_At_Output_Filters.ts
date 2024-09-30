
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C26404 from "@testData/EM2.0/TC_C26404_Verify_RetryError_At_Output_Filters.json";

test.describe("TC_C26404_Verify_RetryError_At_Output_Filters", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    let filter = await io.api.getScriptId(TC_C26404.scriptBody.name);
    if (!filter)
      filter = await io.api.createScriptViaAPI(
        TC_C26404.scriptBody
      );
    TC_C26404.qa__api_tdata[0].pageGenerators[0].qa__export.filter.script._scriptId =
      filter;
    test.step("*** Navigating to Flows Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T6269 TC_C26404_Verify_RetryError_At_Output_Filters", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C26404);
await test.step(
      "Created Flow " +
        flows.get(TC_C26404.flowname)["flowName"] +
        " With ID " +
        flows.get(TC_C26404.flowname)["flowId"],async () => {
          
        }
    );

    //Checking job status
    await io.api.checkJobStatusFromAPI(
      TC_C26404.name,
      flows.get(TC_C26404.flowname)["flowId"],
      [0, 0, 1]
    );

    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C26404.flowname)["flowId"]
    );
    await io.homePage.loadingTime();
    test.step("*** Clicking on export output filter ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_FILTER
    );

    test.step("*** Clicking on the script dropdown ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCRIPTSLIST
    );

    await page.getByText("None").click();

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C26404.flowname,
      flows.get(TC_C26404.flowname)["flowId"],
      [0, 2, 0]
    );
  });
});
