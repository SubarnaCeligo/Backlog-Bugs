
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47613.json";

test.describe("@Author-ParthPatel TC_C47613_C47612_C47611_C47616 | Golden ", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17679 @Zephyr-IO-T17678 @Zephyr-IO-T17677 @Zephyr-IO-T17681 TC_C47613_C47612_C47611_C47616", async ({io,page}, testInfo) => {
    // Create Page Generator and Saving Flow
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.decreaseDrawer();

    //TC_C47613 | Test to verify that user is able to view input data on Router AFE window (Transformation rules applied on Export)
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });
    
    let routerAFEInput = JSON.stringify(await io.homePage.getText(selectors.mappings.INPUTTEXT));
    routerAFEInput = JSON.parse(routerAFEInput);
    await io.assert.expectToContainValue("NAME",routerAFEInput, "");
    await io.assert.expectToContainValue("EMAIL",routerAFEInput, "");
    await io.assert.expectToContainValue("TYPE",routerAFEInput, "");
    await io.assert.expectToContainValue("ID",routerAFEInput, "");

    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);

    //TC_C47612 | Test to verify that user is able to view input data on Router AFE window (Record based data)
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.homePage.isPageReady();
    await io.flowbranching.flowBranchingPage.clickButtonNTimes(
      selectors.mappings.DELETEFIRST,
      4
    );
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });

    routerAFEInput = JSON.stringify(await io.homePage.getText(selectors.mappings.INPUTTEXT));
    routerAFEInput = JSON.parse(routerAFEInput);
    await io.assert.expectToContainValue("record",routerAFEInput, "");
    await io.assert.expectToContainValue("recordType",routerAFEInput, "");
    
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    //TC_C47611 | Test to verify that user is able to view input data on Router AFE window (Group rows on Export)
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.click(selectors.mappings.GROUP_ROWS_CHECKBOX);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });
    routerAFEInput = JSON.stringify(await io.homePage.getText(selectors.mappings.INPUTTEXT));
    routerAFEInput = JSON.parse(routerAFEInput);
    await io.assert.expectToContainValue("rows",routerAFEInput, "");
    await io.assert.expectToContainValue("recordType",routerAFEInput, "");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    //TC_C47616 | Test to verify that user is able to view input data on the router AFE window (On the 2nd or 3rd router added in the flow)
    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    var target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
    await handle.dragTo(target);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 3);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    routerAFEInput = JSON.stringify(await io.homePage.getText(selectors.mappings.INPUTTEXT));
    routerAFEInput = JSON.parse(routerAFEInput);
    await io.assert.expectToContainValue("rows",routerAFEInput, "");
    await io.assert.expectToContainValue("recordType",routerAFEInput, "");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
  });
});
