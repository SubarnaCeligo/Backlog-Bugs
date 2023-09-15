import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C47425 Test to create empty PG/PP bubbles as a administrator user", () => {
  test("C47425 Test to create empty PG/PP bubbles as a administrator user", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
      await page.getByRole('menuitem', { name: 'Add branching' }).click();
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.CANVAS_FIT_TO_SCREEN);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.CANVAS_FIT_TO_SCREEN);
      const pageProcessors = await page.locator(selectors.flowBuilderPagePO.MOVE_PP).all();
      await io.assert.expectToBeValue("2", pageProcessors.length.toString(), "Page processor count not as expected");
  });
});