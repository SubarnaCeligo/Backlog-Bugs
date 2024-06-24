import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C47425 Test to create empty PG/PP bubbles as a administrator user", () => {
  test("@Env-All @Zephyr-IO-T17506 C47425 Test to create empty PG/PP bubbles as a administrator user", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS,0);
      await io.flowBuilder.getByRoleClick('menuitem','Add branching');
      await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
      const pageProcessors = await page.locator(selectors.flowBuilderPagePO.MOVE_PP).all();
      await io.assert.expectToBeValue("2", pageProcessors.length.toString(), "Page processor count not as expected");
  });
});