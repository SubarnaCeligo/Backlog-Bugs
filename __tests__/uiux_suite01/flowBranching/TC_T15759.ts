import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T15759 Verify the helptext for the 'Name' filed in the 'Add branching' drawer", () => {
  test("@Env-All @Zephyr-IO-T15759 @Priority-P2 T15759 Verify the helptext for the 'Name' filed in the 'Add branching' drawer UI_Backlog", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

      await io.flowBuilder.addStep("*** Navigate to the flow builder page ***");
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

      await io.flowBuilder.addStep("*** Opening branching drawer ***");
      await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.PLUS_BUTTONS);
      await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.PLUS_BUTTONS,0);
      await io.flowBuilder.getByRoleClick('menuitem','Add branching');
      await io.flowBuilder.loadingTime();

      await io.flowBuilder.addStep("*** Clicking on help text ***");
      await io.flowBuilder.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 5);

      await io.flowBuilder.addStep("*** Verifying help text ***");
      const helpText = await io.flowBuilder.getText(selectors.myAccountPagePO.HELP_BUBBLE);
      expect(helpText).toContain("Name your branching router (optional) to make your flow more readable on the flow builder canvas.");
  });
});