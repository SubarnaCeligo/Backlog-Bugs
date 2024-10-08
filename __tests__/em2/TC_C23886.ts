
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C23886", () => {
  test("@Env-All @Zephyr-IO-T7312 TC_C23886| Verify user can view 50 jobs in one page in Run history tab", async ({io,page}, testInfo) => {
    test.step("Clicking on the flow TC_23896_DND", async ()=>{});
    const flowId = await io.api.getFlowId("TC_23896_DND");
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId);

    test.step("Clicking on the Run History tab", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    const pageElements = (
      (await page.locator("button + span").nth(1).textContent()).toString()).split(" ");
    const totalCount = await pageElements[pageElements.length - 1];
    const jobCountInCurrPage = await page.$$(
      selectors.flowBuilderPagePO.TOGGLE_JOB
    );

await test.step(
      "Verifying if total number of jobs is above 50"
, async ()=>{});
    expect(parseInt(totalCount)).toBeGreaterThan(50);

await test.step(
      "Verifying if number of jobs in current page is 50"
, async ()=>{});
    await io.assert.expectToBeValue(String(jobCountInCurrPage.length), "50", "");
  });
});
