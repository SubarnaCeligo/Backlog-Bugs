import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import T23953 from "@testData/flowbranching/T23953.json"

test.describe('IO-T23953 Verify the hotspot icons for Flow branching flow where first matching conditions has been set after the test run', () => {
  let id;
  test.afterEach(async ({ io, page }) => {
    await io.api.deleteFlowViaAPI(id);
  });
  test('@Priority-P2 @Zephyr-IO-T23953 @Env-All Verify the hotspot icons for Flow branching flow where first matching conditions has been set after the test run', async ({ io, page }) => {
    id = await io.flowbranching.createFlowBranchFromAPI(T23953);
    await io.flowBuilder.navigateTo(
      process.env.IO_Integration_URL + "flowBuilder/" + id
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUNTEST_BUTTON);
    await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    const pageProcessors = await page.$$('[data-test^="pp-"]');
    const firstImportBubble = pageProcessors[0];
    const firstImporthotspotIcon = await firstImportBubble.evaluate(el => el.querySelector('[aria-label="View test run results"]'));
    expect(firstImporthotspotIcon).not.toBeNull();

    const secondImportBubble = pageProcessors[1];
    const secondImporthotspotIcon = await secondImportBubble.evaluate(el => el.querySelector('[aria-label="View test run results"]'));
    expect(secondImporthotspotIcon).toBeNull();
  });
});
