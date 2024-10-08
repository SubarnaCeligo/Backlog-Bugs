
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C24790 from "@testData/EM2.0/TC_C24790.json";
import { allure } from "allure-playwright";

test.describe("TC_C27452", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T2990 @Zephyr-IO-T3896 TC_C27452", async ({io, page}) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C24790);
await test.step(
      "Created Flow " +
        flows.get(TC_C24790.name)["flowName"] +
        " With ID " +
        flows.get(TC_C24790.name)["flowId"], async () => {
          
        }
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C24790.name,
      flows.get(TC_C24790.name)["flowId"],
      [1, 0, 1]
    );
    // opening menu items
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(
      flows.get(TC_C24790.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await page.getByText("HTTP request").click();
    await io.homePage.loadingTime();
    const httpRequestErrors = await io.homePage.isVisible(
      selectors.integrationPagePO.HTTPREQUEST
    );
    await io.homePage.loadingTime();
    await page.getByText("HTTP response").click();
    const httpResponseErrors = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.RESPONSE
    );
    await io.assert.expectToBeTrue(httpRequestErrors, "");
    await io.assert.expectToBeTrue(httpResponseErrors, "");
await test.step(
      "*** Verified data-test attribute support for Celigo Table Actions ***"
, async ()=>{});
  });
});
