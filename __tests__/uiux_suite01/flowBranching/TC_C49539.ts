import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C49539 Verify the limit of 25 router under flow branching", () => {
  test("@Env-All @Zephyr-IO-T17264 C49539 Verify the limit of 25 router under flow branching", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      for(let i = 0; i < 25; i++){
        await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
        await page.getByRole('menuitem', { name: 'Add branching' }).click();
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.delay(1000);
      }
      await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
      await expect(page.getByLabel("You have reached the maximum of 25 branchings in a flow")).toBeVisible();
  });
});