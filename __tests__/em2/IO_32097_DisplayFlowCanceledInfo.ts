
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import IO_32097_DisplayFlowCanceledInfo from "@testData/EM2.0/IO_32097_DisplayFlowCanceledInfo.json";
  

test.describe("IO_32097_DisplayFlowCanceledInfo", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T3589 @Zephyr-IO-T20436 @Zephyr-IO-T20428 @Zephyr-IO-T20426 @Zephyr-IO-T20425 @Zephyr-IO-T20423 @Zephyr-IO-T20421 @Zephyr-IO-T20435 @Zephyr-IO-T20418 @Zephyr-IO-T20430 @Zephyr-IO-T20419 @Zephyr-IO-T20417 @Zephyr-IO-T20416 @Zephyr-IO-T20414 @Zephyr-IO-T20413 IO_32097_DisplayFlowCanceledInfo", async ({io,page}, testInfo) => {
    //*Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(
      IO_32097_DisplayFlowCanceledInfo
    );
await test.step(
      "Created Flow " +
        flows.get(IO_32097_DisplayFlowCanceledInfo.name)["flowName"] +
        " With ID " +
        flows.get(IO_32097_DisplayFlowCanceledInfo.name)["flowId"],async () => {
          
        }
    );

    await io.flowBuilderDashboard.navigateToEm2Flow(
      flows.get(IO_32097_DisplayFlowCanceledInfo.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    

    const inProgressText = page.locator(
      "div > span >div> span"
    );
    await expect(inProgressText).toContainText("Run in progress", { timeout: 30000 });
    
    let cancelBtn = await page.locator(
      selectors.integrationPagePO.CANCEL_FLOW_RUN
    );
    await cancelBtn.click();

    let cancelBtn2 = await page.locator("[data-test='Cancel run']");
    
    await cancelBtn2.click();

    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.clickButtonNTimes(
      selectors.flowBuilderPagePO.INCREASE_FLOW_BUILDER_BOTTOM_DRAWER,
      2
    );
    await io.flowbranching.flowBranchingPage.clickButtonNTimes(
      selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_DOWN,
      2
    );
    //C66285 IO-T20413
    let infoIcon = await page.$(selectors.basePagePO.TOOLTIP);
    let info = await infoIcon.isEnabled();
    await io.assert.expectToBeTrue(info, "");

    //C66286 IO-T20414
    await io.homePage.click(
      selectors.basePagePO.TOOLTIP
    );
    let infoText = (await io.homePage.getText("[id='pageInfo']")).toString();
    await io.assert.expectToContainValue("Canceled by IO Automation EM2.0", infoText, "");

    //C66288 IO-T20416
    await page.locator(selectors.myAccountPagePO.FLOWSTATUSFILTER).click();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.myAccountPagePO.STATUS_CANCELED
    );
    await io.homePage.loadingTime();
    var canceledFilter = await page.getByText('Select canceled by').isVisible();
    await io.assert.expectToBeTrue(canceledFilter, "");

    //C66289 IO-T20417 //C66291 IO-T20419
    await page.getByText('Select canceled by').click();
    var array: any[] = ["All users", "IO Automation EM2.0", "System"];
    var data = (await io.flowbranching.flowBranchingPage.getList("ul li label")).filter(str => str !== "");
    console.log("data",data);
    await io.assert.expectToContainValue(array[0], data[0], "");
    await io.assert.expectToContainValue(array[1], data[1], "");
    await io.assert.expectToContainValue(array[2], data[2], "");

    //C66302 IO-T20430
    var allUsersSelected = await page.locator("ul li label").nth(0).isChecked();
    await io.assert.expectToBeTrue(allUsersSelected, "");

    //C66290 IO-T20418
    await page.getByText('IO Automation EM2.0').click();
    await page.getByText('Apply').click();
    await io.homePage.click(
      "button[data-test='toggleJobDetail']"
    );
    await io.homePage.loadingTime();
    const dropDownLocator = "tbody tr > td:nth-child(1)";
    const items = ["IO_32097_DisplayFlowCanceledInfo"];
    let ispresent = await io.homePage.getDropDownValue(dropDownLocator, items[0]);
    await io.assert.expectToBeTrue(ispresent, "");

    //C66655 IO-T20435
    var infoIcon1 = await io.homePage.isVisible(
      "//tr[2]//button[@data-test='openPageInfo']"
    );
    await io.assert.expectToBeFalse((infoIcon1), "");
    var infoIcon2 = await io.homePage.isVisible(
      "//tr[3]//button[@data-test='openPageInfo']"
    );
    await io.assert.expectToBeFalse((infoIcon2), "");

    //C66293 IO-T20421
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW);
    var flowText = await io.homePage.getText(
      selectors.flowBuilderPagePO.PAGE_INFO_TEXT
    );
    await io.homePage.loadingTime();
    await expect(flowText[0]).toContain(
      "Expand a flow run to see the historical breakdown of success, ignored, errors and pages encountered at each flow step (such as an export) from previous flow runs. The total number of errors, if any, reported at that flow step contains a link to complete details and actions for each error."
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEBTN
    );

    //C66295 IO-T20423
    await io.homePage.click(
      "//span[text()='Status']//button"
    );
    var flowText1 = await io.homePage.getText(
      "[id='helpBubble'] div > div:nth-child(2) > div> div >div >div"
    );
    console.log(flowText1);
    await io.assert.expectToContainValue(
      "The status of flow runs can be completed successfully, completed with errors, failed, or canceled. When the status is ",
      String(flowText1),
      ""
    );
    await io.assert.expectToContainValue(
      ", you can click the info icon next to it and view who canceled the flow run.",
      String(flowText1),
      ""
    );
    await io.assert.expectToContainValue(
      "status, you can also select the Canceled by filter option and view all the flow runs canceled by a specific user or the system.",
      String(flowText1),
      ""
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEBTN
    );

    //C66297 IO-T20425
    await io.homePage.click(
      "[data-test='dashboard']"
    );
    await io.homePage.loadingTime();
    await page.locator(
      "table > tbody > tr:nth-child(2) > td:nth-child(2)"
    ).isVisible({ timeout: 60000 });

    var infoIc = await page.locator(
      "table > tbody > tr:nth-child(2) > td:nth-child(2) > div > button"
    ).isVisible();
    await io.assert.expectToBeTrue(infoIc, "");

    //C66298 IO-T20426
    await io.homePage.click(
      selectors.basePagePO.TOOLTIP
    );
    let infoText1 = await io.homePage.getText(
      "[id='pageInfo']"
    );
    await io.assert.expectToBeValue(String(infoText1), "Canceled by IO Automation EM2.0", "");

    //C66300 IO-T20428
    await io.homePage.click(
      "//span[text()='Status']//button"
    );
    var flowText2 = await io.homePage.getText(
      selectors.connectionsPagePO.HELP_BUBBLE
    );
    await expect(flowText2).toContain(
      " runs can be completed successfully, completed with errors, failed, or canceled. When the status is "
    );

    //C66656 IO-T20436
    await io.homePage.goToMenu("account-dashboard");
    await io.homePage.click(selectors.dashboardPagePO.COMPLETED_FLOWS);
    await io.homePage.loadingTime();
    await page.locator(
      "table > tbody > tr:nth-child(1) > td:nth-child(6) > a"
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.TOOLTIP,
      1
    );
    let infoText2 = (await io.homePage.getText("[id='pageInfo']")).toString();
    await io.assert.expectToContainValue("Canceled by IO Automation EM2.0",infoText2, "");
    await io.homePage.click(
      "button[data-test='toggleJobDetail']"
    );
    var infoIcon3 = await io.homePage.isVisible(
      "//tr[2]//button[@data-test='openPageInfo']"
    );
    await io.assert.expectToBeFalse((infoIcon3), "");
    var infoIcon4 = await io.homePage.isVisible(
      "//tr[3]//button[@data-test='openPageInfo']"
    );
    await io.assert.expectToBeFalse((infoIcon4), "");
  });
});
