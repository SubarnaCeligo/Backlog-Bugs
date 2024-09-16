
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC_C37203 from "@testData/EM2.0/TC_C37203.json";

test.describe("TC_C37203", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T7532 TC_C37203 | Verify whether user is able to switch between the Open and Resolved error tabs", async ({io,page}, testInfo) => {
    // Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C37203);
await test.step(
      "Created Flow " +
        flows.get(TC_C37203.name)["flowName"] +
        " With ID " +
        flows.get(TC_C37203.name)["flowId"],async () => {
          
        }
    );

    // Run Flow
    await io.api.checkJobStatusFromAPI(
      TC_C37203.name,
      flows.get(TC_C37203.name)["flowId"],
      [0, 0, 1]
    );

    // Open Error Table
    await io.em2.getEm2ErrorTable(
      flows.get(TC_C37203.name)["flowId"]
    );

    await io.flowBuilder.delay(30000);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const openErrorsTab = await page.locator(selectors.integrationPagePO.OPENERRORS);
    const resolvedErrorsTab = await page.locator(selectors.integrationPagePO.RESOLVEDERRORS);

    test.step("Verifying if Open errors tab is selected", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.OPENERRORS);
    let openClasses = await openErrorsTab.getAttribute("class");
    console.log("oc",openClasses);
    expect(openClasses.indexOf(selectors.basePagePO.MUI_SELECTED_OPTION) > -1).toBeTruthy();

await test.step(
      "Verifying if Resolved errors tab is selected"
, async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    openClasses = await openErrorsTab.getAttribute("class");
    const resolvedClasses = await resolvedErrorsTab.getAttribute("class");
    expect(openClasses.indexOf(selectors.basePagePO.MUI_SELECTED_OPTION) > -1).toBeFalsy();
    expect(resolvedClasses.indexOf(selectors.basePagePO.MUI_SELECTED_OPTION) > -1).toBeTruthy();
  });
});
