
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C20854 from "@testData/EM2.0/TC_C20854.json";

test.describe("TC_C20854", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7398 TC_C20854| Verify spinning circle is displayed in the Run console", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C20854);
await test.step(
      "Created Flow " +
        flows.get(TC_C20854.name)["flowName"] +
        " With ID " +
        flows.get(TC_C20854.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C20854.name)["flowId"]
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.REFRESHBTN,
      3
    );
    var runConsole = await io.homePage.isVisible(
      "h3 > span > div > span"
    );
    await io.assert.expectToBeTrue(runConsole, "");
  });
});
