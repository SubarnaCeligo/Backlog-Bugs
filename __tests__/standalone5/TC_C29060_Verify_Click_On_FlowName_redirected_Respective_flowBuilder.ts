
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C29060_Verify_Click_On_FlowName_redirected_Respective_flowBuilder.json";

test.describe("TC_C29060_Verify_Click_On_FlowName_redirected_Respective_flowBuilder", () => {
  let flowID;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowID]);
    test.step("** Deleted flow **", async () => { });
  });
  test("@Zephyr-IO-T6476 @Env-All TC_C29060_Verify_Click_On_FlowName_redirected_Respective_flowBuilder", async ({io,page}, testInfo) => {
    flowID = await io.createResourceFromAPI(FTP, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Entering the Flow name ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking Run flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Dashboard ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Completed flows ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);

    await io.homePage.loadingTime();
    test.step("*** Clicking on the Flow ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.dashboardPagePO.FLOW_NAME_LINK, FTP.name);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Verifying the Respective flow builder page is displayed ***", async ()=>{});

    const Status = await io.homePage.getText(selectors.dashboardPagePO.STATUS_COMPLETED);
    await io.assert.expectToBeValue(String(Status), "Completed", "");
  });
});
