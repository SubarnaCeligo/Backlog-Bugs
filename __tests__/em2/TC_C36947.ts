
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/EM2.0/TC_C36947.json";

test.describe(" TC_C36947", () => {
  let flows;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T1335 TC_C36947", async ({io, page}) => {
    //Create Flows
    flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
await test.step(
      "***Created Flow " +
        flows.get(TC.name)["flowName"] +
        " With ID " +
        flows.get(TC.name)["flowId"] +
        " ***",async () => {
          
        }
    );
    //Open Flow
    await io.goToFlowsPage();
    var flowId = await io.api.getFlowId(
      "TC_C36947_map_HandlingMode_InSOMappings"
    );
    test.step("*** Navigating to flowpage ***", async ()=>{});
    await io.flowBuilder.navigateToTheFlow( flowId);
    test.step("Click on the flow", async ()=>{});
    // enable debugs logs
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    test.step("*** Enabling debugs logs ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.locator(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON).nth(1).click();
    await io.homePage.click(
      selectors.myAccountPagePO.DEBUG
    );
    test.step("*** Debug logs enabled ***", async ()=>{});
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC.name,
      flows.get(TC.name)["flowId"],
      [1, 0, 0]
    );
    test.step("*** Checking in Debugs ***", async ()=>{});
    const debugCont = await page.locator(
      selectors.myAccountPagePO.LOGS
    );
    const TextContent = await debugCont.textContent();
    if (TextContent.indexOf("r.setFieldValue")) {
await test.step(
        "*** Verified  r.setFieldValue present in debugs ***"
, async ()=>{});
    }
  });
});
