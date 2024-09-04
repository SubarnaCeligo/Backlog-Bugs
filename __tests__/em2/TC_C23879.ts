
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C23879 from "@testData/EM2.0/TC_C23879.json";

test.describe("TC_C23879", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7426 TC_C23879", async ({io, page}) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C23879);
await test.step(
      "Created Flow " +
        flows.get(TC_C23879.name)["flowName"] +
        " With ID " +
        flows.get(TC_C23879.name)["flowId"],async () => {
          
        }
    );

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C23879.name)["flowId"]
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    test.step("Changed the tab to Run History", async ()=>{});

    var res = await page.locator(
      selectors.flowBuilderPagePO.RUN_HISTORY_ERROR
    );
    await res.isVisible();
    var getresponse = await res.textContent();
    await io.assert.expectToBeValue(String(getresponse), "You don't have any run history.", "");

await test.step(
      "The Run history displayed a message: You don’t have any run history"
, async ()=>{});
  });
});
