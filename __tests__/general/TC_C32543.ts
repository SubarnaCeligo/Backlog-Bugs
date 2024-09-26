import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import HTTP from "@testData/GENERAL/TC_C32543.json";

test.describe("TC_C32543", () => {
  test("@Zephyr-IO-T2273 @Env-All TC_C32543", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    var flowId = flows.get(HTTP.name)["flowId"];
    await test.step("Created Flow " + flows.get(HTTP.name)["flowName"] +
        " With ID " +
        flows.get(HTTP.name)["flowId"]
    ,async ()=>{});
    //Checking job status
    await io.api.checkJobStatusFromAPI( HTTP.name, flows.get(HTTP.name)["flowId"],
      [0, 0, 0]
    );
    await io.homePage.delay(10000);
    await test.step("*** Checking Dashboard Count ***",()=>{});
    var count = await io.api.validateJobCountFromAPI(HTTP.name, HTTP.qa__expectedDashboardCount);
    var actualMsg = count.get(true)[0];
    if(actualMsg.indexOf("Completed") > -1) {
      await test.step("*** Verified Dashboard Count ***" + " " + actualMsg ,async ()=>{});
    }
    await await io.assert.expectToContainValue("TC_C32543| completed 0 0 0|",actualMsg, "");
    await test.step("*** verified there should be one export job completed with 0 success, 0 errors, 0 ignore, and 0 pages ***",()=>{});
  });
});
