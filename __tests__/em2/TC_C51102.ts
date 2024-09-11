
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Json from "@testData/EM2.0/TC_C51102.json";

test.describe("TC_C51102_Verify_Retrying_Errors_Indicator_Shown_Flowbuilder", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T23311 TC_C51102_Verify_Retrying_Errors_Indicator_Shown_Flowbuilder", async ({io,page}, testInfo) => {
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
    const retry = page.getByText('Retrying errors...').nth(0);
    await retry.waitFor({state: 'visible', timeout: 180000});
    test.step("*** Close the errors window ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

await test.step(
      "*** Verifying Retrying Error Indicator Shown On Error Dashboard ***"
, async ()=>{});
    const ele = await page.getByText("Retrying errors").isVisible();
    await io.assert.expectToBeTrue(ele, "");
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
