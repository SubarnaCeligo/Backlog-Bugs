
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import NS from "@testData/EM2.0/TC_C33586.json";

test.describe("@Env-All @Zephyr-IO-T9795 TC_C33586", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T9795 TC_C33586", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(NS);
await test.step(
      "Created Flow " +
        flows.get(NS.name)["flowName"] +
        " With ID " +
        flows.get(NS.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.runBatchFlowViaAPI(
      NS.name,
      flows.get(NS.name)["flowId"],
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flows.get(NS.name)["flowId"]);

    await io.flowBuilderDashboard.waitForErrorMsgToAppear();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();

    await page.getByText("View request").click();
    await io.homePage.loadingTime();

    var err = await io.homePage.getText(
      "#error .ace_content .ace_layer.ace_text-layer .ace_line_group"
    );
    await io.assert.expectToContainValue(NS.expectedreqresp.viewRequest, String(err), "");
    test.step("Verified the error content in HTTP request", async ()=>{});
    await page.getByText("View response").click();
    await io.homePage.loadingTime();
    var Errmsg = (await io.homePage.getText( "[id='error']")).toString();
    await io.assert.expectToContainValue("invalid_search",Errmsg, "");
    test.step("Verified the error content in HTTP request", async ()=>{});
  });
});
