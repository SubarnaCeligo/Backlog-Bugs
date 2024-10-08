
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C19963 from "@testData/EM2.0/TC_C19963.json";

test.describe("TC_C19963", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7380 |Verify refresh button is enabled if errors are updated", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C19963);
await test.step(
      "Created Flow " +
        flows.get(TC_C19963.name)["flowName"] +
        " With ID " +
        flows.get(TC_C19963.name)["flowId"],async () => {
          
        }
    );

    //Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C19963.name,
      flows.get(TC_C19963.name)["flowId"],
      [0, 0, 1]
    );

    // Open Error Dashboard
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flows.get(TC_C19963.name)["flowId"]);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );

    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    test.step("Selecting errors by clicking on checkboxes", async ()=>{});
    await io.homePage.clickButtonByIndex(
      ".MuiCheckbox-root",
      1
    );
    await io.homePage.click(
      selectors.integrationPagePO.RESOLVEJOBS
    );

    test.step("Resolving the selected errors", async ()=>{});
    await io.homePage.click(
      "li[data-value='selected']"
    );
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    test.step("Running the flow Again.", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.click(
      "[data-test*='pp'] button.MuiButton-disableElevation.MuiButton-textPrimary"
    );
    test.step("Verifying if the Refresh button is enabled", async ()=>{});
    await io.homePage.delay(30000);
    await io.homePage.click(
      "[data-test='flow-builder-resolved-errors']"
    );
    
    await io.homePage.click(
      selectors.integrationPagePO.OPENERRORS
    );
    await io.homePage.loadingTime();
    const refreshButton = page.getByText("Refresh errors");
    await refreshButton.isVisible();
    const enabled = await refreshButton.isEnabled();
    await io.assert.expectToBeTrue(enabled,'refresh button is not enabled');
  });
});
