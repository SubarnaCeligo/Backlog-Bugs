import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102708 Showing the 'Save the changes' pop up when we are seeing the filters in 'Edit Branching'", () => {
    test("@Env-All @Zephyr-IO-T1633 C102708 Showing the 'Save the changes' pop up when we are seeing the filters in 'Edit Branching'", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS, 0);
      await page.getByRole('menuitem', { name: 'Add branching' }).click();
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.loadingTime()
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EDIT_BRANCHING)
      await io.flowBuilder.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
      await io.assert.verifyElementAttributeContainsText(selectors.basePagePO.SAVE, 'class', 'Mui-disabled');
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.CLOSE, 'Close button not displayed');
      const isSaveAndCloseVisible = await io.flowBuilder.isVisible(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.assert.expectToBeValue("false", isSaveAndCloseVisible.toString(), 'Save and Close is displayed');
    });
  });