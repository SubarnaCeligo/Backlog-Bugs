
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/EM2.0/TC_C26405.json";
import { allure } from "allure-playwright";

test.describe("TC_C26405", () => {
  test("@Env-All @Zephyr-IO-T6271 TC_C26405", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating flow ***", async ()=>{});
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(FTP);
    await test.step(
      "Created Flow " +
      flows.get(FTP.name)["flowName"] +
      " With ID " +
      flows.get(FTP.name)["flowId"], async () => {

      }
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.navigateToTheFlow(
      flows.get(FTP.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Add presave hook***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR,
      0
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    test.step("*** Clicking on the create script ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.ADD_SCRIPT
    );
    test.step("*** Entering the name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "preSavePage"
    );
await test.step(
      "Selecting preSave in insert function stub ***"
, async ()=>{});
    await io.homePage.fillWebPage(
      selectors.basePagePO.FUNCTION_STUB,
      "preSavePage"
    );
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    await page.locator(
      selectors.flowBuilderPagePO.SCRIPT_NAME
    ).fill("preSave");
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clcik on the errors***", async ()=>{});
    const flowId = await io.api.getFlowId(FTP.name);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.delay(30000);
    
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
    await io.flowBuilderDashboard.changeErrorDrawerView();
    await page.locator(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU).nth(3).click();
    await io.homePage.click(selectors.flowBuilderPagePO.VIEWERROR);
    await io.homePage.loadingTime();
await test.step(
      "*** verifying Tracekey in the error data ***"
, async ()=>{});
    var data = (await io.homePage.getText(selectors.flowBuilderPagePO.ERROR_DATA)).toString();
    await io.assert.expectToContainValue("script_error",data, "");

    test.step("*** Closing th error ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE_RIGHT_DRAWER, 1);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.loadingTime();
    test.step("*** Enter the valid presave script ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT_HOOK
    );
    await io.homePage.clearTextValue(
      selectors.flowBuilderPagePO.SCRIPT_NAME
    );
    await page.locator(
      selectors.flowBuilderPagePO.SCRIPT_NAME
    ).fill("preSavePage");
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    //Run Flow
    await io.api.checkJobStatusFromAPI(
      FTP.name,
      flowId,
      [4, 0, 0]
    );
  });
});
