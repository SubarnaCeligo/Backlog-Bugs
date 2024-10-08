
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C23890 from "@testData/EM2.0/TC_C23890.json";
import constants from "@testData/EM2.0/constants.json";

test.describe("TC_C23890", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7433 TC_C23890|Verify based on the filter selection, results are fetched in Run history", async ({io, page}) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C23890);
await test.step(
      "Created Flow " +
        flows.get(TC_C23890.name)["flowName"] +
        " With ID " +
        flows.get(TC_C23890.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C23890.name,
      flows.get(TC_C23890.name)["flowId"],
      [1, 0, 1]
    );
    test.step("Running of the flow is over", async ()=>{});

    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C23890.name)["flowId"]
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    let filters = constants.qaprod_timeStamps.filters;
    for (let filter of filters) {
      if (filter != "Custom") {
        await io.flowBuilder.selectRunHistoryRangeFilter( filter);
        let text = await (await page.locator("td li")).textContent();
        await io.assert.expectToBeValue(String(text), "TC_C23890", "");
      } else {
        await  page.locator(selectors.myAccountPagePO.DATEFILTER).click();
        await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.DATERANGEOPTION, filter);
        await page.locator('[class="rdrDay"]').last().click();
        await page.getByText("Apply").click();
        let text = await (
          await page.locator("div >div:nth-child(3) >p")
        ).textContent();
        await io.assert.expectToBeValue(String(text), "You don't have any run history.", "");
      }
    }
    test.step("All filters are working correctly", async ()=>{});
  });
});
