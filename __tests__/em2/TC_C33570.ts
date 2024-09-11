
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C33570 from "@testData/EM2.0/TC_C33570.json";

test.describe("@Env-All @Zephyr-IO-T9782 TC_C33570", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go To Flows Page ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("TC_C33570", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C33570);
await test.step(
      "Created Flow " +
        flows.get(TC_C33570.name)["flowName"] +
        " With ID " +
        flows.get(TC_C33570.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.runBatchFlowViaAPI(
      TC_C33570.name,
      flows.get(TC_C33570.name)["flowId"],
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C33570.name)["flowId"]
    );

    await io.flowBuilderDashboard.waitForErrorMsgToAppear();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    await io.homePage.loadingTime();

    var err = await io.homePage.getText(
      "#error .ace_content .ace_layer.ace_text-layer .ace_line_group"
    );
    await io.assert.expectToContainValue(TC_C33570.expectedreqresp.viewRequest, String(err), "");
    await page.getByText("View response").click();
    await io.homePage.loadingTime();
    var Errmsg = (await io.homePage.getText("[id='error']")).toString();
    await io.assert.expectToContainValue("invalid_search",Errmsg, "");
  });
});
