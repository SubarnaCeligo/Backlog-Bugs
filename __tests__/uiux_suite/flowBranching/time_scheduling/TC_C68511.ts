import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {getRemainingMinutes} from "@celigo/aut-utilities";

test.describe("C68511 Branching flow scheduling-Verify the branching flow gets run on scheduled day/time", () => {
    test("C68511 Branching flow scheduling-Verify the branching flow gets run on scheduled day/time", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.flowBuilder.clickByText('Branching_Scheduling_DND');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCED);
      await io.flowBuilder.clickByText('Each selected minute');
      await io.flowBuilder.clickByText('5');
      await io.flowBuilder.clickByText('20');
      await io.flowBuilder.clickByText('35');
      await io.flowBuilder.clickByText('50');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.flowBuilder.fill(selectors.flowBuilderPagePO.SEARCH, 'Branching_Scheduling_DND');
      const remainingMin = getRemainingMinutes(15);
      await io.flowBuilder.delay(1000 * 60 * remainingMin);
      await io.flowBuilder.waitForElementAttached('text="In progress..."');
      await io.assert.verifyElementDisplayedByText("In progress...", 'The flow scheduled did not run');
      await io.flowBuilder.clickByText('Branching_Scheduling_DND');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.PRESET);
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    });
  });