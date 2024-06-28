import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import IO_T22286 from '../../../testData/inputData/FlowBuilder/IO-T22286.json';

test.describe(`IO_T22286 Verify the new help text for group records field is as expected in HTTP or DB export`, () => {
  let id;
  test.afterEach(async ({ io, page }) => {
      await io.api.deleteFlowViaAPI(id);
  });

  test(`@Env-All @Zephyr-IO-T22286 @Priority-P2 Verify the new help text for group records field is as expected in HTTP or DB export`, async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(IO_T22286, "FLOWS");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT_BUBBLE);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD_HELP_TEXT_BUTTON);

    const value = await io.flowBuilder.getText(selectors.importPagePO.INPUTHELP);
    const expectedvalue =
      "Select the fields you'll group, so each group of records returned by the application is treated as a single record downstream in your flow. For example, export records from a source or lookup, group the records based on a column value, and import each group as a journal entry in NetSuite, where each journal entry contains all the records in the group as line items. When grouping, the page size property dictates the maximum number of groups included in a single page. If the application does not sort the exported data, grouping may not work as expected";
    const func = value.toString().includes(expectedvalue);
    await io.assert.expectToBeTrue(func, "help text doesn't match");
  });
});
