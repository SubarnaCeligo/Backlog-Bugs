import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import {getRemainingMinutes} from "@celigo/aut-utilities";

test.describe("C68513 Next Integration flow set-Verify set Next integration flow run successfully when the current Linear flow gets run on scheduled day/time", () => {
    test("C68513 Next Integration flow set-Verify set Next integration flow run successfully when the current Linear flow gets run on scheduled day/time", async ({io, page}) => {
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.flowBuilder.clickByText('Linear_Scheduling_DND');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FREQUENCY);
      await io.flowBuilder.selectTextfromDropDown(page, 'every_quarter');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.START_TIME);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.TWELVE_FIVE_AM);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.END_TIME);
      await io.flowBuilder.selectTextfromDropDown(page, '11:50 PM');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
      await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
      await io.flowBuilder.fill(selectors.flowBuilderPagePO.SEARCH, 'Linear_Scheduling_DND');
      const remainingMin = getRemainingMinutes(15);
      await io.flowBuilder.delay(1000 * 60 * remainingMin);
      await io.flowBuilder.waitForElementAttached('text="In progress..."');
      await io.assert.verifyElementDisplayedByText("In progress...", 'The flow scheduled did not run');
      await io.flowBuilder.fill(selectors.flowBuilderPagePO.SEARCH, 'Linear2_Scheduling_DND');
      await io.flowBuilder.waitForElementAttached('text="In progress..."');
      await io.assert.verifyElementDisplayedByText("In progress...", 'The flow scheduled did not run');
      await io.flowBuilder.clickByText('Linear_Scheduling_DND');
      await io.flowBuilder.click(selectors.flowBuilderPagePO.SCHEDULE_FLOW);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.PRESET);
      await io.flowBuilder.click(selectors.flowBuilderPagePO.FREQUENCY);
      await io.flowBuilder.clickByText('Please select');
      await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    });
  });