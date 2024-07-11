import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/flowbranching/TC_T17370_T17358.json"

test.describe("T17370_T17358 Verify branching condition when changing the datatype and rearranging the branch order", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test("@Env-STAGING @Priority-P2 @Zephyr-IO-T17370 @Zephyr-IO-T17358 C63882 C59956 Verify branching condition when changing the datatype and rearranging the branch order", async ({ io, page }) => {
    id = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.flowBuilder.navigateTo(
      process.env.IO_Integration_URL + "flowBuilder/" + id
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);

    const leftElement = await page.locator(selectors.flowBranchingPO.SELECT);
    const rightElement = await page.locator(selectors.flowBuilderPagePO.RULE_VALUE);
    const settingsIcon = await page.locator(selectors.flowBranchingPO.SETTINGS_ICON);

    // Setting the datatype to string for field of first branch
    await leftElement.nth(0).hover();
    await settingsIcon.nth(0).click();
    await io.flowBuilder.waitForElementAttached(selectors.flowBranchingPO.SETTINGS_DIALOG);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.DATATYPE);
    await page.getByText("String").click();
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);

    // Setting the datatype to string for value of first branch
    await rightElement.nth(0).hover();
    await settingsIcon.nth(1).click();
    await io.flowBuilder.waitForElementAttached(selectors.flowBranchingPO.SETTINGS_DIALOG);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.DATATYPE);
    await page.getByText("String").click();
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);

    // Setting the datatype to boolean for field of first branch
    await leftElement.nth(0).hover();
    await settingsIcon.nth(0).click();
    await io.flowBuilder.waitForElementAttached(selectors.flowBranchingPO.SETTINGS_DIALOG);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.DATATYPE);
    await page.getByText("Boolean").click();
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);

    // Setting the datatype to boolean for value of first branch
    await rightElement.nth(0).hover();
    await settingsIcon.nth(1).click();
    await io.flowBuilder.waitForElementAttached(selectors.flowBranchingPO.SETTINGS_DIALOG);
    await io.flowBuilder.click(selectors.mappings.MAPPER2DOT0PO.DATATYPE);
    await page.getByText("Boolean").click();
    await io.flowBuilder.click(selectors.basePagePO.MFA_SAVE);

    // Verifying the presence of field and value of first branch
    expect(leftElement.nth(0)).toBeVisible();
    expect(leftElement.nth(0)).toHaveValue("record.shared");
    expect(rightElement.nth(0)).toBeVisible();
    expect(rightElement.nth(0)).toHaveValue("false");

    const allDragHandles = await page.locator(selectors.flowBranchingPO.DRAG_HANDLE);
    const firstDragHandle = allDragHandles.nth(0);
    const secondDragHandle = allDragHandles.nth(1);

    // Rearranging the branch order
    await firstDragHandle.hover();
    await firstDragHandle.dragTo(secondDragHandle);

    // Verifying the rules after rearranging the branches
    expect(leftElement.nth(0)).toHaveValue("record.active");
    expect(rightElement.nth(0)).toHaveValue("true");
  });
});