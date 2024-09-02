
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Json from "@testData/EM2.0/TC_C51277_Verify_View_Results_Navigates_Retries_Tab.json";

test.describe("TC_C51277_Verify_View_Results_Navigates_Retries_Tab", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T23327 TC_C51277_Verify_View_Results_Navigates_Retries_Tab", async ({io,page}, testInfo) => {
    test.step("*** Create a flow***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(Json);
await test.step(
      "Created Flow " +
        flows.get(Json.name)["flowName"] +
        " With ID " +
        flows.get(Json.name)["flowId"],async () => {
          
        }
    );
    test.step("*** Run and check the count ***", async ()=>{});
    await io.api.checkJobStatusFromAPI(
      Json.name,
      flows.get(Json.name)["flowId"],
      [1, 0, 1]
    );

    var flowId = flows.get(Json.name)["flowId"];
    await io.em2.getEm2ErrorTable( flowId);
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON
    );
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.loadingTime();

    test.step("*** clicking on Retry ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );

    test.step("*** clicking on Retry All errors ***", async ()=>{});
    await io.homePage.click(
      "li[data-value='all']"
    );

    test.step("*** clicking on Retry Confirm ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY
    );

    await io.homePage.loadingTime();

    test.step("*** clicking on View Results ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      "//button[text()='View results']",
      1
    );

await test.step(
      "*** Validate the View Result Navigate to retries tab ***"
, async ()=>{});
    var result = (await io.homePage.getText(".MuiPaper-elevation16 .MuiTableRow-hover th")).toString();
    await io.assert.expectToContainValue("Completed",result, "");

    test.step("*** Close the error tab ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    test.step("*** Go to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
