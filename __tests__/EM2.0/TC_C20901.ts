
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20901 from "@testData/EM2.0/TC_C20901.json";

test.describe("TC_C20901", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7307 TC_C20901| Verify If user remove the errored PG/PP from the flow, then the total errors are updated based on the existing PP/PG", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C20901);
await test.step(
      "Created Flow " +
        flows.get(TC_C20901.name)["flowName"] +
        " With ID " +
        flows.get(TC_C20901.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C20901.name,
      flows.get(TC_C20901.name)["flowId"],
      [0, 0, 1]
    );
    test.step("Flow was runned successfully", async ()=>{});
    //navigate to flowbuilder
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C20901.name)["flowId"]
    );
    //Remove PG
    await io.homePage.click(
      selectors.flowBuilderPagePO.REMOVE_PAGE_GENERATOR
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.REMOVE_CONFIRM
    );
    await io.homePage.loadingTime();
    test.step("Errored PG was removed", async ()=>{});
    //goto flows
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    const row = page.locator('table tr').filter({
      has: page.locator(`th a[href='/integrations/${TC_C20901.qa__api_tdata[0].createFlow._integrationId}/flowBuilder/${flows.get(TC_C20901.name)["flowId"]}']`)
    });
    const flowErrors = (await row.locator('td').nth(1).textContent()).split(" ")?.[0];
    await io.assert.expectToContainValue("Success",flowErrors, "");
await test.step(
      "Verified total error got updated based on existing PG"
, async ()=>{});
  });
});
