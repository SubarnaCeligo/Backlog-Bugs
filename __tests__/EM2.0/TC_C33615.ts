
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C33615 from "@testData/EM2.0/TC_C33615.json";

test.describe("TC_C33615", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T9819 TC_C33615", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C33615);
await test.step(
      "Created Flow " +
        flows.get(TC_C33615.name)["flowName"] +
        " With ID " +
        flows.get(TC_C33615.name)["flowId"],async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C33615.name,
      flows.get(TC_C33615.name)["flowId"],
      [1, 0, 1]
    );
    await io.em2.getEm2ErrorTable(
      flows.get(TC_C33615.name)["flowId"]
    );

    await io.flowBuilder.delay(30000);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var request = await page.getByText("View request");
    await request.click();
    test.step("*** Verifying the request text ***", async ()=>{});
    var err = (await io.homePage.getText(
      ".ace_layer.ace_text-layer"
    )).toString();
    expect(err).toContain(TC_C33615.req);
    await page.getByText("View response").click();
    test.step("*** Verifying the response text ***", async ()=>{});
    var Errmsg = (await io.homePage.getText(".ace_layer.ace_text-layer")).toString();
    await io.assert.expectToContainValue("VALUE_LOOKUP_FAILED",Errmsg, "");
    await io.assert.expectToContainValue(
      "A·mapping·error·occurred.·Could·not·find·a·match·for·", Errmsg,""
    );
  });
});
