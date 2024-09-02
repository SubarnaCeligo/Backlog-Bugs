
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/STANDALONE/TC_C106455.json";

test.describe("TC_C106454_C106455_C108202_C108871", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of the test suite ***", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
    await io.homePage.loadingTime();
  });
  test("TC_C106454_C108202 @Zephyr-IO-T23739 @Zephyr-IO-T23746 @Env-All", async ({ io, page }, testInfo) => {
    test.step("Clicking on Create Flow", async ()=>{});
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();

    //TC_C108202 "Success" label is showing in empty flow
    var selector = await io.homePage.isVisible(selectors.flowBuilderPagePO.SUCCESS_ICON);
    await expect(selector).toBeFalsy();
    test.step("*** Verified 'Success' label is not showing in empty flow   ***", async ()=>{});

    //TC_C106454 Verify total errors of flow in flow builder header clickable
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = flows.get(TC.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(TC.name)["flowName"],async ()=>{}
    );
    await io.homePage.loadingTime();
    //Run Flow
    await io.api.checkJobStatusFromAPI( TC.name, flows.get(TC.name)["flowId"],
      [2, 0, 2]
    );
    await io.homePage.loadingTime();
    //navigating to home page
    await io.flowBuilder.navigateToTheFlow(  flows.get(TC.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.ERROR_ICON, 0);
    await io.homePage.loadingTime();
    var openErrorsTab = await io.homePage.isVisible(selectors.integrationPagePO.OPENERRORS);
    await io.assert.expectToBeTrue(openErrorsTab, "Open errors tab not available");
    var resolvedErrorsTab = await io.homePage.isVisible(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.assert.expectToBeTrue(resolvedErrorsTab, "Resolved errors tab not available");
    var retriesErrorTab = await io.homePage.isVisible(selectors.flowBuilderPagePO.EM2DOT0PO.RETRIES_TAB);
    await io.assert.expectToBeTrue(retriesErrorTab, "Retries tab not available");
    test.step("*** Verified Total errors of flow in flow builder header should be clickable and Clicking on errors should open error list drawer   ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C106455 @Zephyr-IO-T23740 @Env-All", async ({ io, page }, testInfo) => {
    //TC_C106455 Verify Flow should show success when no errors also clickable to steps list drawer
    var flow = await io.api.createImpOrExpAndFlowsThruAPI(TC.successFlow);
    flowId = flow.get(TC.successFlow.name)["flowId"];
    await test.step("*** Created Flows :" + flow.get(TC.successFlow.name)["flowName"], async ()=>{}
    );
    //Run Flow
    await io.api.checkJobStatusFromAPI( TC.name, flow.get(TC.successFlow.name)["flowId"],
      [2, 0, 0]
    );

    //navigating to home page
    await io.flowBuilder.navigateToTheFlow( flow.get(TC.successFlow.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await page.waitForTimeout(5000);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SUCCESS_ICON, 0);
    await io.homePage.loadingTime();
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.SSONAME, "Flow: TC_C106455");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Verified Total success of flow in flow builder header should be clickable and Clicking on success should open error list drawer   ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.CLOSE_RIGHT_DRAWER_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("TC_C108871 @Zephyr-IO-T23748 @Env-All", async ({ io, page }, testInfo) => {
    //TC_C108871  For newly created flow "Success" label is showing if we don't have any run also
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC.successFlow);
    flowId = flows.get(TC.successFlow.name)["flowId"];
    await test.step("*** Created Flows :" + flows.get(TC.successFlow.name)["flowName"], async ()=>{}
    );

    //navigating to home page
    await io.flowBuilder.navigateToTheFlow( flows.get(TC.successFlow.name)["flowId"]
    );
    await io.homePage.loadingTime();
    var selector = await io.homePage.isVisible(selectors.flowBuilderPagePO.ERRORSLISTINFLOW);
    await expect(selector).toBeFalsy();
    test.step("*** Verified 'Success' label is not showing for newly created flow   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
