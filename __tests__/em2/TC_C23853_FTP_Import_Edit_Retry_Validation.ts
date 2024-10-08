
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/EM2.0/TC_C23853_FTP_Import_Edit_Retry_Validation.json";

test.describe("TC_C23853_FTP_Import_Edit_Retry_Validation", () => {
  test("@Env-All @Zephyr-IO-T13702 TC_C23853_FTP_Import_Edit_Retry_Validation", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
await test.step(
      "Created Flow " +
        flows.get(FTP.name)["flowName"] +
        " With ID " +
        flows.get(FTP.name)["flowId"],async () => {
          
        }
    );
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flows.get(FTP.name)["flowId"],
      [1, 0, 1]
    );
    test.step("*** Navigate to the flow ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow(
      flows.get(FTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.em2.getEm2ErrorTable(
      flows.get(FTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    test.step("*** verifying edit retry data option ***", async ()=>{});
    let data = await io.homePage.isVisible(
      selectors.basePagePO.EDIT_RETRY_DATA
    );
    await io.assert.expectToBeTrue(data, "");
  });
});
