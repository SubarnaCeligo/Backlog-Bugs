
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/EM2.0/TC_C19912_Flow_Error_Link_validation.json";
import { allure } from "allure-playwright";

test.describe("TC_C19912_Flow_Error_Link_validation", () => {
  test("@Env-All @Zephyr-IO-T6230 TC_C19912_Flow_Error_Link_validation", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    await test.step(
      "Created Flow " +
        flows.get(FTP.name)["flowName"] +
        " With ID " +
        flows.get(FTP.name)["flowId"],async () => {
          
        }
    );

    //Run Flow
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [0, 0, 1]
    );

    // Navigate to Flow
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(FTP.name)["flowId"]
    );    
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.flowBuilderDashboard.waitForErrorMsgToAppear();
    await io.homePage.click(
      selectors.flowBuilderPagePO.ERROR_BUBBLE
    );
    await io.homePage.loadingTime();
await test.step(
      "*** verifying Error drawer is successfully opened ***"
, async ()=>{});
    var data = await io.homePage.isVisible(
      selectors.integrationPagePO.OPENERRORS
    );
    await io.assert.expectToBeTrue(data, "");
    await io.emailPage.closeWindow();
  });
});
