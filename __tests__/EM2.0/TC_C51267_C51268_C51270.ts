
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import Json from "@testData/EM2.0/TC_C51267_C51268_C51270.json";

test.describe("TC_C51267_C51268_C51270", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  // C51267 is marked as one-time test case
  test("@Env-All @Zephyr-IO-T23319 @Zephyr-IO-T23321 TC_C51267_C51268_C51270", async ({io,page}, testInfo) => {
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
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    var flowId = flows.get(Json.name)["flowId"];
    test.step("*** Clicking on Error Table ***", async ()=>{});
    await io.em2.getEm2ErrorTable( flowId);
    await io.homePage.loadingTime();
    await io.homePage.delay(10000);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
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

    test.step("*** Close the errors window ***", async ()=>{});
    await io.homePage.click(await selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.loadingTime();

await test.step(
      "*** Validate retry completed without any issues ***"
, async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.getByText('Retry completed').nth(1).isVisible();
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
