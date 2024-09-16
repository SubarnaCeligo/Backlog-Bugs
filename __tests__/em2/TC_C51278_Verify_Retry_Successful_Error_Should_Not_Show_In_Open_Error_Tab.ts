
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Json from "@testData/EM2.0/TC_C51278_Verify_Retry_Successful_Error_Should_Not_Show_In_Open_Error_Tab.json";

test.describe("TC_C51278_Verify_Retry_Successful_Error_Should_Not_Show_In_Open_Error_Tab", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T23328 TC_C51278_Verify_Retry_Successful_Error_Should_Not_Show_In_Open_Error_Tab", async ({io,page}, testInfo) => {
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(Json);
await test.step(
      "Created Flow " +
        flows.get(Json.name)["flowName"] +
        " With ID " +
        flows.get(Json.name)["flowId"],async () => {
          
        }
    );

    await io.api.checkJobStatusFromAPI(
      Json.name,
      flows.get(Json.name)["flowId"],
      [1, 0, 1]
    );
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flows.get(Json.name)["flowId"]);
    test.step("*** Clicking on PageProcessor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.TRANSFER
    );
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.DIRECTORYPATH, "io.auto.qa/IO_UI_Automation_FTPimport");

    test.step("*** Clicking on Save and close ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    
    var flowId = flows.get(Json.name)["flowId"];
    await io.em2.getEm2ErrorTable( flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** clicking on Retry ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );

    test.step("*** clicking on Retry All errors ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_ALL
    );

    test.step("*** clicking on Retry Confirm ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY
    );

    test.step("*** Clicking on open errors ***", async ()=>{});
    const openerrors = await page.locator(
      selectors.integrationPagePO.OPENERRORS
    );
    await openerrors.click();

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

await test.step(
      "*** Verifying Retrying Error Indicator Shown On Error Dashboard ***"
, async ()=>{});

    var text = await page.getByText("You don't have any open errors.");
    const textState = await text.isVisible();
    await io.assert.expectToBeTrue(textState, "You don't have any open errors.");

    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
