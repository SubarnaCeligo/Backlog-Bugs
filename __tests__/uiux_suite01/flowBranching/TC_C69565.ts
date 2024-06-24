import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C69565 Verify App does not crash when user saves the un-named branch", () => {
    test("@Env-All @Zephyr-IO-T17471 C69565 Verify App does not crash when user saves the un-named branch", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
      await page.getByRole('menuitem', { name: 'Add branching' }).click();
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.BRANCH_OPTIONS);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.BRANCH_OPTIONS, 0);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_BRANCH_0);
      await io.flowBuilder.click(selectors.basePagePO.DELETE);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_RULE);
      await io.flowBuilder.fill(selectors.flowBuilderPagePO.FORM_CONTROL_INPUT, 'test');
      await page.keyboard.press('Enter');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ADD_SOURCE, 'Add source not visible after save and close')
      await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP, 'Add destination/ lookup no visible after save and close'); 
    });
  });