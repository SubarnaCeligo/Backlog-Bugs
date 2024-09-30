
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C19940 from "@testData/EM2.0/TC_C19940.json";

test.describe("TC_C19940", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7293 TC_C19940| Verify user can view the graph for Steps based on the selection in resource dropdown for particular flow", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C19940);
await test.step(
      "Created Flow " +
        flows.get(TC_C19940.name)["flowName"] +
        " With ID " +
        flows.get(TC_C19940.name)["flowId"],async () => {
          
        }
    );

    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C19940.name,
      flows.get(TC_C19940.name)["flowId"],
      [0, 0, 1]
    );

    // Navigate to Flow
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C19940.name)["flowId"]
    );

    await io.homePage.click(
      selectors.flowBuilderPagePO.CHARTS
    );
    await io.homePage.click(
      "button.MuiButton-root.MuiButton-outlined:nth-child(4)"
    );
await test.step(
      "Selecting an option on the resource dropdown"
, async ()=>{});
    var data = await page.$$(selectors.flowBuilderPagePO.CLICKBYTEXT);
    if (!data[0].isChecked()) {
      await io.homePage.click(
        ".MuiTypography-root=Flow-level"
      );
    }
    await page.getByText("Apply").click();
    await io.homePage.loadingTime();
    const labelElement = await (
      await page.locator(`.recharts-legend-wrapper [id='${flows.get(TC_C19940.name)["flowId"]}-success']`)
    ).isVisible()
await test.step(
      "Verifying Resourced dropdown selection on graph"
, async ()=>{});
    await io.assert.expectToBeTrue(labelElement, "");
  });
});
