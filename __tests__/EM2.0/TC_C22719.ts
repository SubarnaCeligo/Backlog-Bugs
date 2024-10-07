
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C22719 from "@testData/EM2.0/TC_C22719.json";

test.describe("TC_C22719", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7514 TC_C22719 | Verify error count and resolved count when we have multiple errors for the multiple records", async ({io,page}, testInfo) => {
    // Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C22719);
await test.step(
      "Created Flow " +
        flows.get(TC_C22719.name)["flowName"] +
        " With ID " +
        flows.get(TC_C22719.name)["flowId"],async () => {
          
        }
    );

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C22719.name,
      flows.get(TC_C22719.name)["flowId"],
      [0, 0, 1]
    );

    // Open Error Table
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flows.get(TC_C22719.name)["flowId"]);
    await io.homePage.loadingTime();
    await io.homePage.delay(30000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    test.step("Clicking on Open errors tab", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENERRORS);
    const openErrorCount = await (
      (await io.homePage.getText(".MuiPaper-elevation16 > div> div:nth-child(3) > div>div:nth-child(1)>div:nth-child(2)>div >div:nth-child(2)>span")).toString()).split(" ")?.[4];

    test.step("Clicking on Resolved errors tab", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    const resolvedErrorCount = await (
      (await io.homePage.getText(".MuiPaper-elevation16 > div> div:nth-child(3) > div>div:nth-child(1)>div:nth-child(2)>div >div:nth-child(2)>span")).toString()).split(" ")?.[4];
    await io.homePage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    const errorCountOnConsole = await (
      (await io.homePage.getText("tbody> tr:nth-child(2)> td:nth-child(5)")).toString()).split(" ")[0];
    const resolvedCountOnConsole = (await io.homePage.getText("tbody> tr:nth-child(2)> td:nth-child(6)")).toString();

await test.step(
      "Verifying error count on run console with that on the error table"
, async ()=>{});
    await io.assert.expectToBeValue(String(openErrorCount), errorCountOnConsole, "");
await test.step(
      "Verifying resolved count on run console with that on the error table"
, async ()=>{});
    await io.assert.expectToBeValue(String(resolvedErrorCount), resolvedCountOnConsole, "");
  });
});
