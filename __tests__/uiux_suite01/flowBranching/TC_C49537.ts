import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C49537 Verify the limit of 25 branches under flow branching", () => {
  test("@Env-All @Zephyr-IO-T17353 C49537 Verify the limit of 25 branches under flow branching", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

      await io.flowBuilder.addStep("Creating a router");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await page.locator(selectors.flowBuilderPagePO.PLUS_BUTTONS).nth(0).click();
      await page.getByRole('menuitem', { name: 'Add branching' }).click();

      await io.flowBuilder.addStep("Adding 25 branches to the router");
      for(let i = 0; i < 23; i++){
        await page.click(selectors.flowBranchingPO.ADD_BRANCH);
        await io.flowBuilder.delay(500);
      }

      await io.flowBuilder.addStep("Verifying the hover message on the Add branch button");
      await expect(page.getByLabel("You have reached the maximum of 25 branches in a branching")).toBeVisible();

      await io.flowBuilder.addStep("Discarding the changes");
      await io.flowBuilder.click(selectors.basePagePO.CLOSE);
      await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
    });
});