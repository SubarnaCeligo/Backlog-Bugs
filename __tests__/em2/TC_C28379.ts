
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C28379 from "@testData/EM2.0/TC_C28379.json";
import { allure } from "allure-playwright";

test.describe("TC_C28379", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T7452 Verify if the request and response are shown correctly when one to many is applied in HTTP import.", async ({io, page}) => {
    test.step("*** Create a flow***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C28379);
await test.step(
      "Created Flow " +
        flows.get(TC_C28379.name)["flowName"] +
        " With ID " +
        flows.get(TC_C28379.name)["flowId"],async () => {
          
        }
    );
    test.step("*** Run and check the count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      TC_C28379.name,
      flows.get(TC_C28379.name)["flowId"],
      [2, 0, 1]
    );
    flowId = flows.get(TC_C28379.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    var totalErrors = await io.homePage.getText(
      "table > tbody > tr:nth-child(2) > td:nth-child(3)"
    );
    await io.assert.expectToBeValue(String(totalErrors), "1", "");
await test.step(
      "*** Data loader flow ran successfully without any error.***"
, async ()=>{});
  });

  test("Verify user can download the files from the Run history Action column for Data Loader", async ({io}) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    flowId = await io.api.getFlowId(TC_C28379.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.click(
      selectors.integrationPagePO.RUNHISTORYOPTIONS
    );
    var downloadforS3exports = selectors.flowBuilderPagePO.MENUITEM;
    await io.assert.verifyElementToBeClickable(downloadforS3exports);
  });
});
