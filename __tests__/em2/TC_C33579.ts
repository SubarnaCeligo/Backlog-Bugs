
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C33579 from "@testData/EM2.0/TC_C33579.json";

test.describe("@Env-All @Zephyr-IO-T9789 TC_C33579", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("TC_C33579", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C33579);
await test.step(
      "Created Flow " +
        flows.get(TC_C33579.name)["flowName"] +
        " With ID " +
        flows.get(TC_C33579.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.runBatchFlowViaAPI(
      TC_C33579.name,
      flows.get(TC_C33579.name)["flowId"],
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C33579.name)["flowId"]
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
    await io.assert.expectToContainValue(TC_C33579.expectedreqresp.viewRequest, String(err), "");
    test.step("Verified the error content in HTTP request", async ()=>{});
    await page.getByText("View response").click();
    await io.homePage.loadingTime();
    var Errmsg = (await io.homePage.getText( "[id='error']")).toString();
    Errmsg = Errmsg.replace(/\s+/g, '');
    await io.assert.expectToContainValue("javaexception",Errmsg, "");
    await io.assert.expectToContainValue("[CUSTOM456]·is·invalid.",Errmsg, "");
    test.step("Verified the error content in HTTP request", async ()=>{});
  });
});
