
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C45147.json";

test.describe("@Author-ParthPatel TC_C45147_C45556_C45131", () => {
  let id;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Env-All @Zephyr-IO-T17304 @Zephyr-IO-T17319 @Zephyr-IO-T17295 TC_C45147_C45556_C45131", async ({io, page}) => {
    let conn = flowbranch.pageProcessors[0].qa__import._connectionId;
    await test.step("*** Creating Flow ***", async ()=>{
      id = await io.createResourceFromAPI(flowbranch, 'FLOWS');
    });

    //TC_C45147 | Verify the add button under "Destination and lookups" for linear flows
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
    const applicationDrawer = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(applicationDrawer), "Create destination / lookup", "");
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.click(
      selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS
    );
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.flowBuilder.clickByText(conn);
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "Configured Import From UI"
    );
    await io.homePage.fillWebPage(
      selectors.exportsPagePO.HTTP_METHOD,
      "PUT"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    //TC_C45556 | Verify the saving branching without changing its name and adding any filter/script
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    let dragHandle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL);
    let draggable = await dragHandle.evaluate(element => getComputedStyle(element).cursor);
    await io.assert.expectToBeValue(String(draggable), "default", "");
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 1);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    test.step("Clicked On Add branching .", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    let newNodes = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    expect(newNodes).toEqual(2);
    dragHandle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    draggable = await dragHandle.evaluate(element => getComputedStyle(element).cursor);
    await io.assert.expectToBeValue(String(draggable), "grab", "");

    // TC_C45131 | Verify the add branching window without adding any branch
    const routers = await io.homePage.getLengthOfElementArray(
      selectors.flowBranchingPO.ROUTERS
    );
    expect(routers).toEqual(1);
    let count = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    expect(count).toEqual(2);
  });
});
