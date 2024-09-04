
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
  
test.describe("@Author-ParthPatel TC_C45127_C45114_C45102_C45139_C45162_C45158_C45151", () => {

  test.beforeEach(async ({io}) => {
    await test.step("*** Go to flows page ***", async ()=>{
      let scriptId = await io.api.getScriptId("Branching Script");
      if (!scriptId) {
        scriptId = await io.api.createScriptViaAPI( {
          name: "Branching Script",
          content:
            'function branching (options) {let id = "script for branching";return [0]}',
        });
      }
      await io.goToFlowsPage();
    });
  });

  test("@Env-All @Zephyr-IO-T17291 @Zephyr-IO-T17279 @Zephyr-IO-T17267 @Zephyr-IO-T17300 @Zephyr-IO-T17311 @Zephyr-IO-T17309 @Zephyr-IO-T17306 TC_C45127_C45114_C45102_C45139_C45162_C45158_C45151", async ({io, page}) => {
    await io.homePage.isPageReady();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.flowBuilder.clickCreateFlowButton();
      await io.homePage.isPageReady();
    });
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();

    //TC_C45102 | Verify "add branching"
    await test.step("*** Clicking on javascript toggle ***", async ()=>{
      await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    });
    await io.homePage.click(
      selectors.flowBuilderPagePO.SCRIPTSLIST
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.SCRIPTDROPDOWN,
      "Branching"
    );
    let uniqueApplicationDrawer = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(uniqueApplicationDrawer), "Add branching", "");
    
    const [type, branches] = await io.flowbranching.flowBranchingPage.getList(
      selectors.myAccountPagePO.STEPS_MFA_ENABLED_OWNER_4
    );
    await io.assert.expectToBeValue(String(type), "Branching type", "");
    await io.assert.expectToBeValue(String(branches), "Branches", "");

    //TC_C45114 | Verify inline editing of Branch name
    await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(0).click({clickCount: 3})
    await page.keyboard.press('Backspace');
    await page.keyboard.type("First Branch");
    await page.keyboard.press('Enter');

    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.EDIT_BRANCH_NAME_BTN, 0);
    await io.homePage.click(selectors.flowBranchingPO.EDIT_BRANCH_NAME_DESCRIPTION);
    await io.assert.verifyJSElementValue(
      selectors.flowBuilderPagePO.FLOW_NAME,
      "First Branch"
    );

    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);

    //TC_C45127 | Verify the script function by writing new script
    await io.homePage.click(selectors.basePagePO.SCRIPT_ID);
    await page.getByRole('option', { name: "Branching Script", exact: true }).nth(0).click();
    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    var result = await io.homePage.getText(
      selectors.mappings.RESULTTEXT
    );
    expect(result).toContain(
      "The record will pass through branch 0: First Branch"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    //TC_C45139 | Verify adding branches at terminal edge
    let count = await (await page.$$(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP)).length
    expect(count).toEqual(2);

    //TC_C45162 | Verify the schedule icon for unconfigured flow
    const icon = (selectors.flowBuilderPagePO.SCHEDULEICON);
    await io.assert.verifyElementNotToBeClickable(icon);
    await io.flowBuilder.hover(icon, 0, true);
    
    let text = await io.homePage.getText(
      selectors.mappings.TOOLTIP
    );
    expect(text).toContain(
      "Remove or configure all unconfigured flow steps to edit the flow schedule"
    );
    //TC_C45158 | Verify the branch name changes
    await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTERS, 0);

    await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(1).click({clickCount: 3})
    await page.keyboard.press('Backspace');
    await page.keyboard.type("Second Branch");
    await page.keyboard.press('Enter');
    
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    await expect(page.locator(selectors.flowBranchingPO.BRANCH_NAME_HEADER).nth(1)).toContainText("Second Branch");

    //TC_C45151 | Verify the menu list under "Destination and lookups" for branched flows.
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
    const [first, second] = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.MENUITEM
    );
    await io.assert.expectToBeValue(String(first), "First Branch", "");
    await io.assert.expectToBeValue(String(second), "Second Branch", "");
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.MENUITEM, 1);
    await io.homePage.loadingTime();
    let lookupApplicationDrawer = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(lookupApplicationDrawer), "Create destination / lookup", "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
