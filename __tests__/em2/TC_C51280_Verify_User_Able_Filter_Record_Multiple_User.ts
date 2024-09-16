
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Json from "@testData/EM2.0/TC_C51280_Verify_User_Able_Filter_Record_Multiple_User.json";

test.describe("TC_C51280_Verify_User_Able_Filter_Record_Multiple_User", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T23329 TC_C51280_Verify_User_Able_Filter_Record_Multiple_User", async ({io,page}, testInfo) => {
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

    var flowId = flows.get(Json.name)["flowId"];
    await io.em2.getEm2ErrorTable( flowId);
    test.step("Error Table is opened", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);

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

    test.step("*** clicking on Retries errors tab***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** clicking on Select button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.INSTALLBUTTONTEMPLATE,
      0
    );

    var array: any[] = ["All users", "IO Automation EM2.0"];

await test.step(
      "*** Verifying User able to filter record with multiple user ***"
, async ()=>{});
    var testData = await io.homePage.getText("ul li label");
    expect(testData).toEqual(array);
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
